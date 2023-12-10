const express = require("express");
const { signUpUser, signInUser } = require("../controllers/user");
const router = express.Router();

router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);

module.exports = router;
