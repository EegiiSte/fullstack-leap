const Note = require("../../models/note");
const mongoose = require("mongoose");

const deleteNote = async (req, res) => {
  const { id } = req.params;
  //   const name = req.body.name;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "NoteDel by id --> Invalid note id",
    });
  }

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    res.status(404).json({
      message: "Delete by id --> Note not found",
    });
    return;
  }
  res.status(200).json(note);
};

module.exports = { deleteNote };
