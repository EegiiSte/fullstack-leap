const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const userData = [
  {
    id: 1,
    name: "Egi",
    age: "100",
  },
  {
    id: 2,
    name: "Otgo",
    age: "19",
  },
  {
    id: 3,
    name: "Bek",
    age: "19",
  },
  {
    id: 4,
    name: "Duuree",
    age: "19",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  //   const name = req.body.name;

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json(user);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  user.name = name;
  res.status(200).json(user);
});

//  create

router.post("/", (req, res) => {
  const name = req.body.name;

  const newUser = {
    id: uuidv4 /* */,
    name: name,
  };

  userData.push(newUser);
  res.status(201).json({ message: "User added successfully", userData });
});

// delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  const index = userData.indexOf(user);
  userData.splice(index, 1);

  res.status(200).json(userData);
});

// post
router.post("/", (req, res) => {
  res.status(201).json({
    message: "User created successfully",
  });
});

module.exports = router;
