import { Button, Flex } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import "./Note.css";
// import { EditProductModal } from "./modal/EditProductModal";

import ".";
import { useNotesContext } from "../../context/NotesContext";
import { DeleteNoteModal } from "./modal/DeleteNoteModal";
import { EditNoteModal } from "./modal/EditNoteModal";

export const Note = () => {
  const { id } = useParams();
  //state for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //state for delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //   console.log(`Note -> id ${id}`);

  const { notes, notesContextLoading } = useNotesContext();

  const selectedNote = notes.find((note) => note._id === id);

  if (notesContextLoading) {
    return <div>...Loading Notes</div>;
  } else {
    return (
      <div className="d-flex align-c flex-direction-c just-c">
        <Header />
        <div
          className="padding-top-10"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          This is Single Note page
          <Flex className="gap-10 d-flex flex-direction-row" gap="small">
            <Button className="EditDelButton" block onClick={handleOpen}>
              Edit
            </Button>
            <Button className="EditDelButton" block onClick={handleOpenDelete}>
              Delete
            </Button>
          </Flex>
        </div>
        {selectedNote && (
          <div
            style={{
              backgroundColor: "whitesmoke",
              height: "50%",
              width: "80%",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              <h3>Name : {selectedNote.name}</h3>
              <p>Description : {selectedNote.description}</p>
              <p>Goal : {selectedNote.goal}</p>
              <p>Category : {selectedNote.category}</p>
            </div>
          </div>
        )}

        <EditNoteModal
          handleClose={handleClose}
          open={open}
          selectedNote={selectedNote}
          id={id}
        />
        <DeleteNoteModal
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          selectedNote={selectedNote}
          id={id}
        />
      </div>
    );
  }
};
