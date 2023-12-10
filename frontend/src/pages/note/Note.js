import { Button, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, HeadMUI } from "../../component";
import "./note.css";
// import { EditProductModal } from "./modal/EditProductModal";

import ".";
import { DeleteNoteModal } from "./modal/DeleteNoteModal";
import { EditNoteModal } from "./modal/EditNoteModal";

export const Note = () => {
  const [selectedNote, setSelectedNote] = useState();

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

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notes/${id}`);
        const data = await response.data;

        setSelectedNote(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
    return () => fetchNote();
  }, [id]);

  //   console.log(selectedProduct);
  if (!selectedNote) {
    return <div>Item not found </div>;
  }

  return (
    <div className="d-flex align-c flex-direction-c just-c">
      <HeadMUI pathValue={3} />
      <div
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
      /{" "}
      <EditNoteModal
        handleClose={handleClose}
        open={open}
        selectedNote={selectedNote}
        id={id}
      />
      <DeleteNoteModal
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        id={id}
      />
    </div>
  );
};

// <EditProductModal2
// handleClose={handleClose}
// open={open}
// selectedProduct={selectedProduct}
// id={id}
// />
//
