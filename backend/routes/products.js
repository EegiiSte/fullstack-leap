const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Iphone" },
    { id: 2, name: "iMac" },
    { id: 3, name: "AirPod" },
  ]);
});

module.exports = router;
