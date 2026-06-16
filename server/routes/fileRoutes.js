const express = require("express");
const File = require("../models/File");

const router = express.Router();

router.get(
  "/",
  async (req, res) => {
    try {

      const files =
        await File.find().sort({
          createdAt: -1,
        });

      res.json(files);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Error",
      });

    }
  }
);

router.delete(
  "/:id",
  async (req, res) => {
    try {

      await File.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted",
      });

    } catch (error) {

      console.log(error);

    }
  }
);

module.exports = router;