// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept",
//   );

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// app.use(express.json());

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "Swarka backend is running" });
// });

// app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         error: "Файл изображения не передан",
//       });
//     }

//     const mimeType = req.file.mimetype;
//     const supportedMimeTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/webp",
//     ];

//     if (!supportedMimeTypes.includes(mimeType)) {
//       return res.status(400).json({
//         error: "Поддерживаются только JPG, PNG и WEBP",
//       });
//     }

//     const base64Image = req.file.buffer.toString("base64");
//     const dataUrl = `data:${mimeType};base64,${base64Image}`;

//     const response = await client.responses.create({
//       model: "gpt-4.1-mini",
//       input: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "input_text",
//               text: `Проанализируй фото сварного шва и верни строго JSON:
// {
//   "hasDefect": boolean,
//   "defectType": string,
//   "severity": "low" | "medium" | "high" | "unknown",
//   "confidence": number,
//   "comment": string,
//   "recommendation": string
// }

// Допустимые defectType:
// "no_defect", "porosity", "crack", "undercut", "burn_through",
// "lack_of_fusion", "slag_inclusion", "spatter", "unknown"

// Не добавляй markdown и пояснения вне JSON.`,
//             },
//             {
//               type: "input_image",
//               image_url: dataUrl,
//               detail: "high",
//             },
//           ],
//         },
//       ],
//     });

//     let parsed;

//     try {
//       parsed = JSON.parse(response.output_text);
//     } catch {
//       return res.status(500).json({
//         error: "Модель вернула невалидный JSON",
//         raw: response.output_text,
//       });
//     }

//     return res.json(parsed);
//   } catch (error) {
//     console.error("Analyze error:", error);

//     return res.status(500).json({
//       error: "Ошибка при анализе изображения",
//       details: error?.message || "Unknown error",
//       cause: error?.cause?.code || null,
//     });
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
});

const ROBOFLOW_KEY = process.env.ROBOFLOW_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Нет изображения" });
    }

    const base64 = req.file.buffer.toString("base64");

    // 🔎 1 Detect defect через Roboflow
    const detection = await fetch(
      `https://detect.roboflow.com/welding-defect/1?api_key=${ROBOFLOW_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: base64,
      },
    );

    const detectionData = await detection.json();

    if (!detectionData.predictions.length) {
      return res.json({
        hasDefect: false,
        defectType: "no_defect",
        severity: "low",
        confidence: 0.9,
        comment: "Дефекты не обнаружены",
        recommendation: "Сварной шов выглядит корректно",
      });
    }

    const defect = detectionData.predictions[0];

    // 🧠 2 LLM объяснение через OpenRouter
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
Обнаружен дефект сварки: ${defect.class}

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

    const llmData = await llm.json();

    const text = llmData.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        severity: "unknown",
        comment: text,
        recommendation: "Проверьте сварной шов вручную",
      };
    }

    // 📦 Нормализуем координаты bounding box
    const box = {
      x: defect.x / detectionData.image.width,
      y: defect.y / detectionData.image.height,
      width: defect.width / detectionData.image.width,
      height: defect.height / detectionData.image.height,
    };

    return res.json({
      hasDefect: true,
      defectType: defect.class,
      severity: parsed.severity,
      confidence: defect.confidence,
      comment: parsed.comment,
      recommendation: parsed.recommendation,
      box,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Ошибка анализа",
      details: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Swarka AI server started on port 5000");
});