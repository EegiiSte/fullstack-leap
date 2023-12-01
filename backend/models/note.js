const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Note name is required"],
    },
    goal: {
      type: "string",
      required: [true, "Note goal is required"],
    },
    description: {
      type: "string",
      required: [true, "Note description is required"],
    },
    category: {
      type: "string",
      required: [true, "Note category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
