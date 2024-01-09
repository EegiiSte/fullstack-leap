const Note = require("../../models/note");

const createNote = async (req, res) => {
  const { name, goal, description, category } = req.body;
  const userId = req.user._id;
  try {
    if (!name || !goal || !description || !category || !userId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const note = await Note.create({
        name,
        goal,
        description,
        category,
        userId,
      });
      res.status(201).json(note);
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createNote };
