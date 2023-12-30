import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const { children } = props;

  const [theme, setTheme] = useState("light");
  const [themeLoading, setThemeLoading] = useState(true);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme,
        themeLoading,
        setThemeLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
