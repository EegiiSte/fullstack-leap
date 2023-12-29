import { Transfer } from "antd";
import React, { useEffect, useState } from "react";
import { Header } from "../../component";
import { Metaballs } from "../../component/canvas";
import { useThemeContext } from "../../context/ThemeContext";
import "./Home.css";

export const Home = () => {
  const { setTheme, theme } = useThemeContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header />
      <div
        className="padding-top-10"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          backgroundColor: theme === "light" ? "" : "#5896cf",
        }}
      ></div>
    </div>
  );
};
