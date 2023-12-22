import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { useNotesContext } from "../../context/NotesContext";
import { CreateNoteModal } from "./CreateNoteModal";

import "./Notes.css";

export const Notes = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { notes, notesContextLoading } = useNotesContext();

  if (notesContextLoading) {
    return <div>...Loading Notes</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      <div className="d-flex just-s-evenly width-100pr padding-top-10">
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
            className="box-shadow-gray"
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

      <CreateNoteModal handleClose={handleClose} open={open} />
    </div>
  );
};
