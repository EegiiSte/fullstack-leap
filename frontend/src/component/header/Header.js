import { message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  if (!userContextLoading && currentUser) {
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
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link
              to="/notes"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Notes
            </Link>
          </div>
        </div>

        <div className="Header-Right">
          <div className="Header-Right_Item">
            <div>{currentUser.user.email}</div>
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link
              onClick={() => signOut()}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Sign Out
            </Link>
          </div>
        </div>

        {contextHolder}
      </div>
    );
  }

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
            to="/sign-in"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="Header-Right">
        <div className="Header-Right_Item">
          <Link
            to="/sign-up"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {contextHolder}
    </div>
  );
};
