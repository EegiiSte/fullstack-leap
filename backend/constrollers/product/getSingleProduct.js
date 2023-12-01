const Product = require("../../models/product");
const mongoose = require("mongoose");

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  //   const name = req.body.name;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Product by id --> Invalid product id",
    });
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({
      message: "Get by id --> Product not found",
    });
    return;
  }
  res.status(200).json(product);
};

module.exports = { getSingleProduct };
