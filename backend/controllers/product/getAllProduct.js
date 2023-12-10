const Product = require("../../models/product");

const getAllProduct = async (req, res) => {
  try {
    const sort = { createdAt: -1 };
    const products = await Product.find({}).sort(sort);

    if (!products) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProduct };