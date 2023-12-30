import { Button, Card, Flex, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { useNotesContext } from "../../context/NotesContext";
import { useThemeContext } from "../../context/ThemeContext";
import { CreateNoteModal } from "./CreateNoteModal";

import "./Notes.css";

export const Notes = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { notes, notesContextLoading } = useNotesContext();
  const { theme } = useThemeContext();

  if (notesContextLoading) {
    return <div>...Loading Notes</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      <div
        className="d-flex just-s-evenly width-100pr padding-top-10"
        style={{
          textShadow:
            theme === "light" ? "0px 0px 0px black" : "0px 0px 4px black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        This is Notes page
        <div>
          <Button
            block
            onClick={handleOpen}
            style={{
              backgroundColor: theme === "light" ? "white" : "black",
              color: theme === "light" ? "black" : "white",
            }}
          >
            Create Note
          </Button>
        </div>
      </div>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        {notes &&
          notes.map((note) => (
            <Card
              hoverable
              style={{
                flexWrap: "wrap",
                width: 260,
                height: 200,
              }}
              bodyStyle={{
                borderRadius: "10px",
                padding: 10,
                overflow: "hidden",
                backgroundColor: theme === "light" ? "white" : "black",
              }}
              onClick={() => navigate(`/notes/${note._id}`)}
            >
              <Flex justify="center">
                <Flex
                  vertical
                  align="center"
                  justify="center"
                  style={{
                    padding: 10,
                    fontSize: 10,
                  }}
                >
                  <Typography
                    level={3}
                    style={{
                      fontSize: 14,
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    <p>Name : {note.name}</p>
                    <p>Goal : {note.goal}</p>
                    <p>Description : {note.description}</p>
                    <p>Category : {note.category}</p>
                  </Typography>
                </Flex>
              </Flex>
            </Card>
          ))}
      </Flex>
      <CreateNoteModal handleClose={handleClose} open={open} />
    </div>
  );
};
