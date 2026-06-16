const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");

const { GoogleGenerativeAI } = require(
  "@google/generative-ai"
);

const router = express.Router();

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

// STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

// ANALYZE RESUME

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message:
            "No file uploaded",
        });
      }

      const dataBuffer =
        fs.readFileSync(
          req.file.path
        );

      const pdfData =
        await pdf(dataBuffer);

      const text =
        pdfData.text;

      const prompt = `
You are a professional ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:

${text}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      const cleaned =
        response
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      const aiData =
        JSON.parse(cleaned);

      res.json({
        atsScore:
          aiData.atsScore,

        strengths:
          aiData.strengths,

        weaknesses:
          aiData.weaknesses,

        suggestions:
          aiData.suggestions,

        extractedText:
          text.substring(
            0,
            1000
          ),
      });

    } catch (error) {

      console.error(
        "Resume AI Error:"
      );

      console.error(error);

      res.status(500).json({
        message:
          "Resume analysis failed",
      });

    }
  }
);

module.exports = router;