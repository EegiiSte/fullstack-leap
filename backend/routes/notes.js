const express = require("express");

const {
  createNote,
  getAllNote,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../constrollers/note");

const router = express.Router();

//GET/ note/  ---> get all note
router.get("/", getAllNote);

//GET/ note/:id  ---> get single note
router.get("/:id", getSingleNote);

//POST/ note  ---> create new note
router.post("/", createNote);

//PUT/ note  ---> update single note
router.put("/:id", updateNote);

//DELETE/ note  ---> delete single note
router.delete("/:id", deleteNote);

module.exports = router;
