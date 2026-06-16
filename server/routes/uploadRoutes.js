const express = require("express");
const multer = require("multer");
const path = require("path");

const File = require("../models/File");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    try {
      const savedFile =
        await File.create({
          fileName:
            req.file.originalname,

          fileUrl:
            req.file.filename,
        });

      res.json({
        message: "File Uploaded",
        file: savedFile,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload Error",
      });

    }
  }
);

module.exports = router;