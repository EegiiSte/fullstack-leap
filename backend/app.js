// import {express} from 'express';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const notesRouter = require("./routes/notes");

require("dotenv").config();

const port = process.env.PORT || 3000;

// 11.17 middleware -- logging ---> saving user activity
app.use((req, res, next) => {
  console.log(
    `this user requested ${req.method} metod from this path: ${req.path}`
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hello world! from backend> app.js !!");
});

// test
app.use("/users", usersRouter);

app.use("/products", productsRouter);

app.use("/notes", notesRouter);

// 11.17 middleware ---> error handling
app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "middleware  -> error handling -> Page not found" });
  //   res.status(404).json({ message: "Page not found" });
  next();
});

// ----------------------------------------------------------------

// app.listen(port, () => {
//   console.log(`server is running at http://localhost:${port}`);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("Connect to MongoDB successfully!"),
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    })
  )
  .catch((error) => console.log(error));
