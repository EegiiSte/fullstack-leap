import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  if (!userContextLoading && currentUser) {
    return (
      <div
        className="Header box-shadow-gray"
        style={{
          // backgroundColor: "white",
          color: "white",
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
                textShadow: " 1px 0 20px blue",
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
                color: "black",
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
                color: "black",
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
        color: "white",
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
              color: "white",
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
              color: "white",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
