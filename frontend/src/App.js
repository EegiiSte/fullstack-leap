import { Home, Notes, Note, Product, Products } from "./pages";
import { SignIn } from "../src/pages/signIn/SignIn";
import { SignUp } from "../src/pages/sign-up/SignUp";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./mainStyle.css";
import { useUserContext } from "./context/UserContext";
import Profile from "./pages/profile/Profile";

export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>...Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />

        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <Product /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/notes"
          element={currentUser ? <Notes /> : <Navigate to="/" />}
        />
        <Route
          path="/notes/:id"
          element={currentUser ? <Note /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
