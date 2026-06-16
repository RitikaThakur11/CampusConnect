const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    fileName: String,
    atsScore: Number,
    analysis: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Resume",
  resumeSchema
);