const Note = require("../../models/note");

const getAllNote = async (req, res) => {
  const userId = req.user._id;
  try {
    const sort = { createdAt: -1 };
    const notes = await Note.find({ userId }).sort(sort);

    if (!notes) {
      res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllNote };
