import { createContext, useContext } from "react";
import { useMediaQuery } from "@mui/material";

const ResponsiveContext = createContext();

export const ThemeContextProvider = (props) => {
  const { children } = props;

  return (
    <ResponsiveContext.Provider value={{}}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ResponsiveContext);
};
