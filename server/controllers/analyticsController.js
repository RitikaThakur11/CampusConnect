const User = require("../models/User");
const Note = require("../models/Note");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalNotes = await Note.countDocuments();

    res.status(200).json({
      totalUsers,
      totalNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};