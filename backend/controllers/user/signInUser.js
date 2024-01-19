const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signInUser = async (req, res) => {
  const { email, password, name, profilePicUrl } = req.body;
  console.log("signInUser", req.body);

  // Check if the email and password are provided
  if (!email || !password) {
    res.status(400).send("Please provide email and password");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).send("User does not exist! Check your email address.");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).send("Invalid credentials");
    return;
  }
  const token = CreateToken(user._id);

  res.status(200).json({
    message: "Sign in successfully",
    user: {
      email: user.email,
      name: user.name,
      profilePicUrl: user.profilePicUrl,
    },
    token,
  });
};

module.exports = { signInUser };
