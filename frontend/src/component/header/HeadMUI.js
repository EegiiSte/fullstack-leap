import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const HeadMUI = (props) => {
  const { pathValue } = props;

  const navigate = useNavigate();
  const [value, setValue] = useState(`${pathValue}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            </TabList>
          </Box>
          <TabPanel value="1"></TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3"></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
