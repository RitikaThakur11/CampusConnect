const express = require("express");
const Chat = require("../models/Chat");

const router = express.Router();

/*
GET ALL CHAT HISTORY
*/

router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({
        createdAt: -1,
      })
      .limit(100);

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch chat history",
    });
  }
});

module.exports = router;