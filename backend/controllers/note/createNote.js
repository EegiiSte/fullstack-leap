const Note = require("../../models/note");

const createNote = async (req, res) => {
  const { name, goal, description, category } = req.body;

  try {
    if (!name || !goal || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const note = await Note.create({
        name,
        goal,
        description,
        category,
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
