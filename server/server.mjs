import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import sizeOf from "image-size";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const ROBOFLOW_KEY = process.env.ROBOFLOW_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

// =========================
// MODELS
// =========================

const MODELS = [
  "google/gemma-3-27b-it",
  "deepseek/deepseek-chat-v3-0324",
  "openai/gpt-4o-mini",
];

// =========================
// DEFECT MAP
// =========================

const DEFECT_MAP = {
  inclusion: "Шлаковое включение",
  crack: "Трещина",
  porosity: "Пористость",
  undercut: "Подрез",
  spatter: "Разбрызгивание металла",
  lack_of_fusion: "Непровар",
  burn_through: "Прожог",
  distortion: "Деформация шва",
  overlap: "Наплыв",
  crater: "Кратер",
  no_defect: "Дефекты не обнаружены",
};

// =========================
// HELPERS
// =========================

function normalizeDefectName(defect) {
  return DEFECT_MAP[defect] || defect;
}

function extractJson(text) {
  try {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/gim, "")
      .replace(/```/gim, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return null;
    }

    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function askLLM(messages) {
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log("TRY MODEL:", model);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            messages,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        lastError = data;
        continue;
      }

      const text = data?.choices?.[0]?.message?.content;

      if (!text) {
        lastError = "Empty response";
        continue;
      }

      return text;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    typeof lastError === "string" ? lastError : JSON.stringify(lastError),
  );
}

// =========================
// ROOT
// =========================

app.get("/", (req, res) => {
  res.send("Swarka AI server is running");
});

// =========================
// IMAGE ANALYSIS
// =========================

app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Нет изображения",
      });
    }

    const base64Image = req.file.buffer.toString("base64");

    // =========================
    // ROBOFLOW
    // =========================

    const detection = await fetch(
      "https://serverless.roboflow.com/s-workspace-bddld/workflows/detect-count-and-visualize-3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: ROBOFLOW_KEY,
          inputs: {
            image: {
              type: "base64",
              value: base64Image,
            },
          },
        }),
      },
    );

    const detectionData = await detection.json();

    if (!detection.ok) {
      return res.status(500).json({
        error: "Ошибка Roboflow",
        details: detectionData,
      });
    }

    const predictions =
      detectionData?.outputs?.[0]?.predictions?.predictions || [];

    // =========================
    // NO DEFECTS
    // =========================

    if (!predictions.length) {
      return res.json({
        hasDefect: false,
        defects: [],
        comment: "AI не обнаружил дефектов",
        recommendation: "Корректировка не требуется",
      });
    }

    // =========================
    // IMAGE SIZE
    // =========================

    const dimensions = sizeOf(req.file.buffer);

    const imgW = dimensions.width || 1;
    const imgH = dimensions.height || 1;

    // =========================
    // PROCESS DEFECTS
    // =========================

    const defects = await Promise.all(
      predictions.map(async (defect) => {
        const rawDefectType =
          defect.class ||
          defect.class_name ||
          defect.predicted_classes ||
          "unknown";

        const defectType = normalizeDefectName(rawDefectType);

        const aiText = await askLLM([
          {
            role: "system",
            content: `
Ты инженер-сварщик.

Отвечай:
- только на русском
- без markdown
- без английского

Верни JSON:

{
  "severity": "low | medium | high",
  "comment": "краткое объяснение",
  "recommendation": "что исправить"
}
`,
          },
          {
            role: "user",
            content: `
Дефект: ${defectType}

Объясни:
1. Причину
2. Опасность
3. Как исправить
`,
          },
        ]);

        const parsed = extractJson(aiText);

        return {
          defectType,
          severity: parsed?.severity || "medium",
          confidence:
            defect.confidence > 1
              ? defect.confidence / 100
              : defect.confidence || 0,
          comment:
            parsed?.comment || "Требуется дополнительная проверка дефекта.",
          recommendation:
            parsed?.recommendation || "Проверьте параметры сварки.",

          box: {
            x: (defect.x || 0) / imgW,
            y: (defect.y || 0) / imgH,
            width: (defect.width || 0) / imgW,
            height: (defect.height || 0) / imgH,
          },
        };
      }),
    );

    return res.json({
      hasDefect: true,
      defects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Ошибка анализа",
      details: error?.message || "Unknown error",
    });
  }
});

// =========================
// CHAT
// =========================

app.post("/api/welding-chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Нет сообщений" });
    }
    const history = messages.slice(-10);
    const formattedMessages = [
      {
        role: "system",
        content: ` Ты AI-помощник по сварке. Ты отвечаешь только на темы: - TIG - MIG/MAG - MMA - сварочные дефекты - сварочные аппараты - электроды - металлы - режимы сварки Если вопрос не связан со сваркой — сообщи что специализируешься только на сварке. Отвечай: - кратко - профессионально - только на русском `,
      },
      ...history.map((msg) => ({ role: msg.role, content: msg.text })),
    ];
    const answer = await askLLM(formattedMessages);
    return res.json({ answer });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ошибка AI", details: error?.message || "Unknown error" });
  }
});

// =========================
// START
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
