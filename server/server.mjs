import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Swarka backend is running" });
});

app.post("/api/analyze-weld", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Файл изображения не передан",
      });
    }

    const mimeType = req.file.mimetype;
    const supportedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!supportedMimeTypes.includes(mimeType)) {
      return res.status(400).json({
        error: "Поддерживаются только JPG, PNG и WEBP",
      });
    }

    const base64Image = req.file.buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Проанализируй фото сварного шва и верни строго JSON:
{
  "hasDefect": boolean,
  "defectType": string,
  "severity": "low" | "medium" | "high" | "unknown",
  "confidence": number,
  "comment": string,
  "recommendation": string
}

Допустимые defectType:
"no_defect", "porosity", "crack", "undercut", "burn_through",
"lack_of_fusion", "slag_inclusion", "spatter", "unknown"

Не добавляй markdown и пояснения вне JSON.`,
            },
            {
              type: "input_image",
              image_url: dataUrl,
              detail: "high",
            },
          ],
        },
      ],
    });

    let parsed;

    try {
      parsed = JSON.parse(response.output_text);
    } catch {
      return res.status(500).json({
        error: "Модель вернула невалидный JSON",
        raw: response.output_text,
      });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Analyze error:", error);

    return res.status(500).json({
      error: "Ошибка при анализе изображения",
      details: error?.message || "Unknown error",
      cause: error?.cause?.code || null,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
