import { Switch } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();

  const { setTheme, theme } = useThemeContext();

  const handleChange = (checked) => {
    console.log("Header", checked);
    if (!checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  if (!userContextLoading && currentUser) {
    return (
      <div
        className="Header box-shadow-gray"
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <Switch
          checkedChildren="Black Theme"
          unCheckedChildren="Light Theme"
          defaultUnChecked
          onChange={handleChange}
          size="small"
        />
        <div className="Header-Left">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: theme === "light" ? "black" : "white",
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
                color: theme === "light" ? "black" : "white",
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
                color: theme === "light" ? "black" : "white",
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
                color: theme === "light" ? "black" : "white",
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
                color: theme === "light" ? "black" : "white",
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
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Switch
        checkedChildren="Black Theme"
        unCheckedChildren="Light Theme"
        defaultChecked
        onChange={handleChange}
        size="small"
      />
      <div className="Header-Left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme === "light" ? "black" : "white",
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
              color: theme === "light" ? "black" : "white",
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
              color: theme === "light" ? "black" : "white",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
