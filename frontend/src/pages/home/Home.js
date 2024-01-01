import { QRCode, Watermark } from "antd";
import React from "react";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix/MatrixBG.js";
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
      {theme === "light" ? (
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
            zIndex="100"
            color={theme === "light" ? "black" : "white"}
            bgColor={theme === "light" ? "white" : "black"}
            value="https://fullstack-leap-frontend-six.vercel.app"
          />
        </div>
      ) : (
        <div>
          <MatrixBG />
          <div
            zIndex="1"
            className="padding-top-10"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p>Hello SomeOne</p>
            <QRCode
              zIndex="100"
              color={theme === "light" ? "black" : "white"}
              bgColor={theme === "light" ? "white" : "black"}
              value="https://fullstack-leap-frontend-six.vercel.app"
            />
          </div>
        </div>
      )}
    </div>
  );
};
