const Note = require("../../models/note");
const mongoose = require("mongoose");

const updateNote = async (req, res) => {
  const { id } = req.params;
  //   const name = req.body.name;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Update by id --> Invalid note id",
    });
  }

  const updatedNote = await Note.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!updatedNote) {
    res.status(404).json({
      message: "Update by id --> Note not found",
    });
    return;
  }
  res.status(200).json(updatedNote);
};

module.exports = { updateNote };
