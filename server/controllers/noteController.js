const Note = require("../models/Note");

// CREATE NOTE
const createNote = async (req, res) => {
  try {

    const { title, content, category } = req.body;
   const note = await Note.create({
  title,
  content,
  category,
});

    

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET ALL NOTES
const getNotes = async (req, res) => {
  try {

    const notes = await Note.find();

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {

    const { title, content, category } = req.body;
    

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
  title,
  content,
  category,
},
      
      {
        new: true,
      }
    );

    res.status(200).json(note);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Note deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};