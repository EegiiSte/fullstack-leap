import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const { children } = props;

  const [themeLoading, setThemeLoading] = useState(true);
  const [textColor, setTextColor] = useState("black");
  const [blackAndWhite, setBlackAndWhite] = useState("white");
  const [blackAndWhiteSmoke, setBlackAndWhiteSmoke] = useState("whitesmoke");
  const [menuColor, setMenuColor] = useState("rgba(88, 204, 210, 0.66)");
  const [backgroundColor, setBackgroundColor] = useState("whitesmoke");

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      setTextColor("white");
      setBlackAndWhite("black");
      setBlackAndWhiteSmoke("black");
      setMenuColor("black");
      setBackgroundColor("darkgray");
      setThemeLoading(false);
    } else {
      setTextColor("black");
      setBlackAndWhite("white");
      setBlackAndWhiteSmoke("whitesmoke");
      setMenuColor("rgba(88, 204, 210, 0.66)");
      setBackgroundColor("whitesmoke");
      setThemeLoading(false);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        onChange,
        textColor,
        themeLoading,
        menuColor,
        backgroundColor,
        blackAndWhite,
        blackAndWhiteSmoke,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
