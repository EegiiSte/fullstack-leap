import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);

  console.log("UserProvider-currentUser ", currentUser);

  const [userContextLoading, setUserContextLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setUserContextLoading(false);
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };
  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    console.log("UserProvider --> logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <userContext.Provider
      value={{
        currentUser,
        signOut,
        signIn,
        signUp,
        userContextLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
