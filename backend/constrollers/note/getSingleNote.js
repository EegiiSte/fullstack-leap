const Note = require("../../models/note");
const mongoose = require("mongoose");

const getSingleNote = async (req, res) => {
  const { id } = req.params;
  //   const name = req.body.name;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Note by id --> Invalid Note id",
    });
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({
      message: "Get by id --> Note not found",
    });
    return;
  }
  res.status(200).json(note);
};

module.exports = { getSingleNote };
