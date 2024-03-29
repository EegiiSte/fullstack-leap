import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { NotesContexProvider } from "./context/NotesContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductContexProvider } from "./context/ProductsContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import "./mobileStyle.css";
import "./tabletStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <NotificationProvider>
        <UserProvider>
          <ProductContexProvider>
            <NotesContexProvider>
              <App />
            </NotesContexProvider>
          </ProductContexProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
