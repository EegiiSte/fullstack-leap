import { Home, Notes, Note, Product, Products } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./mainStyle.css";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};
