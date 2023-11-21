const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "User name is required"],
    },
    age: {
      type: "number",
      required: [true, "User age is required"],
    },
    description: {
      type: "string",
      required: [true, "User description is required"],
    },
    category: {
      type: "string",
      required: [true, "User category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", productSchema);
