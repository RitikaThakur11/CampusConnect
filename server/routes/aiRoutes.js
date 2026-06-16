const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/Chat");

const router = express.Router();

console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// TEST ROUTE
router.get("/test", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result =
      await model.generateContent(
        "Say hello"
      );

    res.json({
      reply: result.response.text(),
    });

  } catch (error) {

    console.log(
      "===== TEST ERROR ====="
    );

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// CHAT ROUTE
router.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    console.log(
      "User Message:",
      message
    );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const result =
      await model.generateContent(
        message
      );

    const reply =
      result.response.text();

    await Chat.create({
      userId: "Ritika",
      question: message,
      answer: reply,
    });

    res.json({
      reply,
    });

  } catch (error) {

    console.log(
      "===== GEMINI ERROR ====="
    );

    console.log(error);

    console.log(
      "========================"
    );

    res.status(500).json({
      message:
        error.message ||
        "AI Error",
    });
  }
});

module.exports = router;