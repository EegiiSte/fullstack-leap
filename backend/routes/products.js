const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//GET/ products  ---> get all products
// router.get("/", (req, res) => {
//   res.status(200).json([
//     { id: 1, name: "Iphone" },
//     { id: 2, name: "iMac" },
//     { id: 3, name: "AirPod" },
//   ]);
// });

//GET/ products/:id  ---> get single product
router.get("/", (req, res) => {
  res.status(200).json({
    message: "get single product",
  });
});

//POST/ products  ---> create new product
router.post("/", async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      // return res.status(201).json({
      //   message: "You are creating a new product",
      // });

      const product = await Product.create({
        name,
        price,
        description,
        category,
      });
      res.status(201).json({ product });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//PUT/ products  ---> update single product

//DELETE/ products  ---> delete single product

module.exports = router;
