const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();

// GET ALL RESUMES

router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({
      createdAt: -1,
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE ANALYSIS

router.post("/", async (req, res) => {
  try {
    const { fileName, atsScore, analysis } =
      req.body;

    const resume =
      await Resume.create({
        fileName,
        atsScore,
        analysis,
      });

    res.json(resume);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;