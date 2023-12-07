import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicTabs, HeadMUI } from "../../component";
import { Header } from "../../component/header/Header";
import { CreateNoteModal } from "./CreateNoteModal";

import "./Notes.css";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getNotes = async () => {
      const response = await axios.get("http://localhost:8080/notes");

      const data = response.data;

      setNotes(data);
    };
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("http://localhost:8080/notes");

    const data = response.data;

    setNotes(data);
  };

  console.log(`Notes  ==> ${notes}`);
  return (
    <div
      style={{
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <HeadMUI pathValue={3} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        This is Notes page
        <div>
          <Button block onClick={handleOpen}>
            Create Note
          </Button>
        </div>
      </div>
      {notes &&
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: "whitesmoke",
              width: 200,
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
            }}
            onClick={() => navigate(`/notes/${note._id}`)}
          >
            <h3>Name : {note.name}</h3>
            <p>Goal : {note.goal}</p>
            <p>Description : {note.description}</p>
            <p>Category : {note.category}</p>
          </div>
        ))}

      <CreateNoteModal
        handleClose={handleClose}
        reload={() => {
          getNotes();
        }}
        open={open}
      />
    </div>
  );
};
