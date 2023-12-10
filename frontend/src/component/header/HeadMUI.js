import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInModal } from "./SignInModal";
import { SignUpModal } from "./SignUpModal";

import { message } from "antd";
import axios from "axios";

export const HeadMUI = (props) => {
  const { pathValue } = props;

  const navigate = useNavigate();
  const [value, setValue] = useState(`${pathValue}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // sign in modal
  const [openSignInModal, setOpenSignInModal] = React.useState(false);
  const handleOpenSignInModal = () => setOpenSignInModal(true);
  const handleCloseSignInModal = () => setOpenSignInModal(false);
  // sign up modal
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
  const handleOpenSignUpModal = () => setOpenSignUpModal(true);
  const handleCloseSignUpModal = () => setOpenSignUpModal(false);

  const [user, setUser] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  console.log(`HeaderMui:user --> ${user}`);

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Home"
                value="1"
                onClick={() => {
                  navigate("/");
                }}
              />
              <Tab
                label="Products"
                value="2"
                onClick={() => {
                  navigate("/products");
                }}
              />
              <Tab
                label="Notes"
                value="3"
                onClick={() => {
                  navigate("/notes");
                }}
              />
              <Tab label="Sign In" value="4" onClick={handleOpenSignInModal} />
              <Tab label="Sign Up" value="5" onClick={handleOpenSignUpModal} />
              {user && <Tab value="6">{user.email}</Tab>}
              {!user && <div />}
            </TabList>
          </Box>
          <TabPanel value="1"></TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3"></TabPanel>
          <TabPanel value="4"></TabPanel>
          <TabPanel value="5"></TabPanel>
        </TabContext>
      </Box>
      <SignInModal
        handleCloseSignInModal={handleCloseSignInModal}
        openSignInModal={openSignInModal}
        user={user}
        setUser={setUser}
        messageApi={messageApi}
      />
      <SignUpModal
        handleCloseSignUpModal={handleCloseSignUpModal}
        openSignUpModal={openSignUpModal}
      />
      {contextHolder}
    </div>
  );
};
