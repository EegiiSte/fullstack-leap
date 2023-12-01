import React from "react";
import { Header } from "../../component/header/Header";
import "./Home.css";

export const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        This is Home page
      </div>
    </div>
  );
};
