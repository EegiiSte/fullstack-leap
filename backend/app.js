// import {express} from 'express';
const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.send("hello world! from backend app.js !!");
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
