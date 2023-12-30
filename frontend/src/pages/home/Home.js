import { QRCode, Watermark } from "antd";
import React from "react";
import { Header } from "../../component";
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
      <Watermark content={["Home Page"]}>
        <div
          className="padding-top-10"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme === "light" ? "" : "whitesmoke",
          }}
        >
          <QRCode
            color={theme === "light" ? "black" : "white"}
            bgColor={theme === "light" ? "white" : "black"}
            value="https://fullstack-leap-frontend-six.vercel.app"
          />
        </div>
      </Watermark>
    </div>
  );
};
