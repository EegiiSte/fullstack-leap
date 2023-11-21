const express = require("express");
const router = express.Router();
const User = require("..//models/user");

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
    age: "29",
  },
  {
    id: 4,
    name: "Duuree",
    age: "25",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  //   const name = req.body.name;

  const user = userData.find((user) => user.id == id);

  if (!user) {
    res.status(404).json({
      message: "Get by id --> User not found",
    });
  }
  res.status(200).json({
    user,
    message: "Get by id --> Request successful",
  });
});

// update
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const user = userData.find((user) => user.id == id);

  if (!user) {
    res.status(404).json({
      message: "update -> User not found",
    });
  }
  user.name = name;
  res.status(200).json({ user, message: "Put by id --> Request successful" });
});

//  create

// router.post("/", (req, res) => {
//   const name = req.body.name;

//   const newUser = {
//     // id: userData.length + 1,
//     id: uuidv4(),
//     name: name,
//   };

//   userData.push(newUser);
//   res.status(201).json({ message: "User added successfully", userData });
// });

//POST/ user  ---> create new user
router.post("/", async (req, res) => {
  const { name, age, description, category } = req.body;

  try {
    if (!name || !age || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      // return res.status(201).json({
      //   message: "You are creating a new product",
      // });

      const user = await User.create({
        name,
        age,
        description,
        category,
      });
      res.status(201).json({ user });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req);
  const user = userData.find((user) => user.id == id);

  if (!user) {
    res.status(404).json({
      message: "del_by_id->User not found",
    });
  }

  const index = userData.indexOf(user);
  userData.splice(index, 1);

  res.status(200).json({
    userData,
    message: `del_by_id->Delete request successful. Deleted " id: ${user.id}, name: ${user.name}, age: ${user.age}"`,
  });
});
// delete by name

router.delete("/", (req, res) => {
  const name = req.body.name;
  console.log(req);

  const user = userData.find((user) => user.name === name);

  if (!user) {
    res.status(404).json({
      message: "del_by_name->User not found",
    });
  }

  const index = userData.indexOf(user);
  userData.splice(index, 1);

  res.status(200).json({
    userData,
    message: `del_by_name->User not found. Deleted " id: ${user.id}, name: ${user.name}, age: ${user.age}"`,
  });
});
// delete by age

router.delete("/", (req, res) => {
  const age = req.body.age;

  const user = userData.find((user) => user.age == age);

  if (!user) {
    res.status(404).json({
      message: "del_by_age->User not found",
    });
  }

  const index = userData.indexOf(user);
  userData.splice(index, 1);

  res.status(200).json({
    userData,
    message: `del_by_age->User not found. Deleted " id: ${user.id}, name: ${user.name}, age: ${user.age}"`,
  });
});

// post
router.post("/", (req, res) => {
  res.status(201).json({
    message: "User created successfully",
  });
});

module.exports = router;
