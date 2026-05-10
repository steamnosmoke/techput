import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

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

const MODELS = [
  "google/gemma-3-27b-it",
  "deepseek/deepseek-chat-v3-0324",
  "openai/gpt-4o-mini",
];

console.log("ROBOFLOW_KEY EXISTS:", !!ROBOFLOW_KEY);
console.log("OPENROUTER_KEY EXISTS:", !!OPENROUTER_KEY);

app.get("/", (req, res) => {
  res.send("Swarka AI server is running");
});

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
            temperature: 0.3,
            messages,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("MODEL FAILED:", model);

        lastError = data;
        continue;
      }

      const text = data?.choices?.[0]?.message?.content;

      if (!text) {
        lastError = "Empty response";
        continue;
      }

      console.log("MODEL SUCCESS:", model);

      return text;
    } catch (error) {
      console.log("MODEL ERROR:", model);

      lastError = error;
    }
  }

  throw new Error(
    typeof lastError === "string" ? lastError : JSON.stringify(lastError),
  );
}

function normalizeDefectName(defect) {
  const map = {
    inclusion: "Шлаковое включение",
    crack: "Трещина",
    porosity: "Пористость",
    undercut: "Подрез",
    spatter: "Разбрызгивание",
    lack_of_fusion: "Непровар",
    burn_through: "Прожог",
  };

  return map[defect] || defect;
}

app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
  try {
    console.log("START IMAGE ANALYSIS");

    if (!req.file) {
      return res.status(400).json({
        error: "Нет изображения",
      });
    }

    const base64Image = req.file.buffer.toString("base64");

    // =====================
    // ROBOFLOW
    // =====================

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

    const predictions =
      detectionData?.outputs?.[0]?.predictions?.predictions || [];

    if (!predictions.length) {
      return res.json({
        hasDefect: false,
        defectType: "no_defect",
        severity: "low",
        confidence: 0.95,
        comment: "AI не обнаружил выраженных дефектов сварного соединения.",
        recommendation:
          "Шов выглядит стабильно. Рекомендуется дополнительный контроль при нагрузке.",
      });
    }

    const defect = predictions[0];

    const defectTypeRaw =
      defect.class ||
      defect.class_name ||
      defect.predicted_classes ||
      "unknown";

    const defectType = normalizeDefectName(defectTypeRaw);

    // =====================
    // AI EXPLANATION
    // =====================

    const aiText = await askLLM([
      {
        role: "system",
        content: `
Ты профессиональный инженер-сварщик.

Отвечай только на русском языке.

Объясняй дефекты сварки технически грамотно и кратко.

Никогда не используй английские слова.

Верни строго JSON.
`,
      },
      {
        role: "user",
        content: `
Обнаружен дефект сварного шва: ${defectType}

Верни JSON:

{
  "severity": "low | medium | high",
  "comment": "краткое объяснение причины",
  "recommendation": "что исправить"
}
`,
      },
    ]);

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch {
      parsed = {
        severity: "medium",
        comment: aiText,
        recommendation: "Требуется ручная проверка",
      };
    }

    return res.json({
      hasDefect: true,
      defectType: defectTypeRaw,
      severity: parsed.severity,
      confidence: defect.confidence || 0,
      comment: parsed.comment,
      recommendation: parsed.recommendation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Ошибка анализа",
      details: error.message,
    });
  }
});

app.post("/api/welding-chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Нет сообщения",
      });
    }

    const answer = await askLLM([
      {
        role: "system",
        content: `
Ты AI-помощник по сварке.

Ты отвечаешь только на темы:
- MIG/MAG
- TIG
- MMA
- дефекты сварки
- электроды
- режимы тока
- настройки аппарата
- металлы
- сварочные швы

Отвечай кратко и профессионально.
Только на русском языке.
`,
      },
      {
        role: "user",
        content: message,
      },
    ]);

    return res.json({
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Ошибка AI",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on ${PORT}`);
});
