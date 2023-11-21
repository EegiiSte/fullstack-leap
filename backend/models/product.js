const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Product name is required"],
    },
    price: {
      type: "number",
      required: [true, "Product price is required"],
    },
    description: {
      type: "string",
      required: [true, "Product description is required"],
    },
    category: {
      type: "string",
      required: [true, "Product category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
