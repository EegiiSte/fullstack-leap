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
          display: "flex",
          justifyContent: "center",
        }}
      >
        {theme === "light" ? <div /> : <Metaballs />}
      </div>
    </div>
  );
};
