import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export const Header = () => {
  return (
    <div
      className="Header"
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div className="Header-Left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          Home
        </Link>
      </div>
      <div className="Header-Right">
        <div className="Header-Right_Item">
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};
