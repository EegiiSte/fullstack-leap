import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { NotesContexProvider } from "./context/NotesContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductContexProvider } from "./context/ProductsContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <UserProvider>
        <ProductContexProvider>
          <NotesContexProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </NotesContexProvider>
        </ProductContexProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
);
