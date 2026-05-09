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

console.log("ROBOFLOW_KEY EXISTS:", !!ROBOFLOW_KEY);
console.log("OPENROUTER_KEY EXISTS:", !!OPENROUTER_KEY);

app.get("/", (req, res) => {
  console.log("GET /");

  res.send("Swarka AI server is running");
});

app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
  try {
    console.log("=================================");
    console.log("REQUEST START");
    console.log("TIME:", new Date().toISOString());

    if (!req.file) {
      console.log("NO FILE");

      return res.status(400).json({
        error: "Нет изображения",
      });
    }

    console.log("FILE RECEIVED");
    console.log("FILE NAME:", req.file.originalname);
    console.log("FILE TYPE:", req.file.mimetype);
    console.log("FILE SIZE:", req.file.size);

    // =====================================
    // ROBOFLOW WORKFLOW
    // =====================================

    console.log("START ROBOFLOW REQUEST");

    const base64Image = req.file.buffer.toString("base64");

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

    console.log("ROBOFLOW STATUS:", detection.status);

    const detectionData = await detection.json();

    console.log("ROBOFLOW RESPONSE:", JSON.stringify(detectionData, null, 2));

    if (!detection.ok) {
      console.log("ROBOFLOW ERROR");

      return res.status(500).json({
        error: "Ошибка Roboflow",
        details: detectionData,
      });
    }

    // =====================================
    // PREDICTIONS
    // =====================================

    const predictions =
      detectionData?.outputs?.[0]?.predictions?.predictions || [];

    console.log(
      "RAW PREDICTIONS:",
      JSON.stringify(detectionData?.outputs?.[0]?.predictions, null, 2),
    );

    console.log("PREDICTIONS ARRAY:", predictions);

    if (!predictions.length) {
      console.log("NO DEFECTS FOUND");

      return res.json({
        hasDefect: false,
        defectType: "no_defect",
        severity: "low",
        confidence: 0.9,
        comment: "Дефекты не обнаружены",
        recommendation: "Сварной шов выглядит корректно",
      });
    }

    const defect = predictions[0];

    console.log("DEFECT FOUND:", defect);

    const defectType =
      defect.class ||
      defect.class_name ||
      defect.predicted_classes ||
      "unknown";

    // =====================================
    // OPENROUTER
    // =====================================

    console.log("START OPENROUTER REQUEST");

    const llm = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: `
Обнаружен дефект сварки: ${defectType}

Верни строго JSON:

{
  "severity": "low | medium | high",
  "comment": "короткое объяснение",
  "recommendation": "как исправить"
}

Без markdown.
`,
          },
        ],
      }),
    });

    console.log("OPENROUTER STATUS:", llm.status);

    const llmData = await llm.json();

    console.log("OPENROUTER RESPONSE:", JSON.stringify(llmData, null, 2));

    const text = llmData?.choices?.[0]?.message?.content || "";

    console.log("LLM TEXT:", text);

    let parsed;

    try {
      parsed = JSON.parse(text);

      console.log("JSON PARSED SUCCESS");
    } catch (e) {
      console.log("JSON PARSE FAILED");

      parsed = {
        severity: "unknown",
        comment: text,
        recommendation: "Проверьте сварной шов вручную",
      };
    }

    // =====================================
    // NORMALIZE BOX
    // =====================================

    const imgW =
      detectionData?.outputs?.[0]?.image?.width || defect.image?.width || 1;

    const imgH =
      detectionData?.outputs?.[0]?.image?.height || defect.image?.height || 1;

    const box = {
      x: (defect.x || 0) / imgW,
      y: (defect.y || 0) / imgH,
      width: (defect.width || 0) / imgW,
      height: (defect.height || 0) / imgH,
    };

    console.log("FINAL RESPONSE READY");

    return res.json({
      hasDefect: true,
      defectType,
      severity: parsed.severity,
      confidence: defect.confidence || 0,
      comment: parsed.comment,
      recommendation: parsed.recommendation,
      box,
    });
  } catch (error) {
    console.error("=================================");
    console.error("SERVER ERROR");
    console.error(error);

    return res.status(500).json({
      error: "Ошибка анализа",
      details: error?.message || "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Swarka AI server started on port ${PORT}`);
});
