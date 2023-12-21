import { Switch } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();

  const { onChange, textColor, themeLoading, menuColor } = useThemeContext();

  if (userContextLoading && themeLoading) {
    return <div>Loading</div>;
  }

  if (!userContextLoading && currentUser) {
    return (
      <div
        className="Header box-shadow-gray"
        style={{
          backgroundColor: menuColor,
          color: textColor,
        }}
      >
        <Switch defaultChecked onChange={onChange} size="small" />
        <div className="Header-Left">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: textColor,
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
                color: textColor,
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
                color: textColor,
              }}
            >
              Notes
            </Link>
          </div>
        </div>

        <div className="Header-Right">
          <div className="Header-Right_Item">
            <div
              style={{
                color: textColor,
              }}
            >
              {currentUser.user.email}
            </div>
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link
              onClick={() => signOut()}
              style={{
                textDecoration: "none",
                color: textColor,
              }}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="Header box-shadow-gray"
      style={{
        // backgroundColor: "white",
        color: textColor,
      }}
    >
      <div className="Header-Left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: textColor,
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
              color: textColor,
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
              color: textColor,
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
