import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import "./Product.css";

import { ModalCreateProduct } from "../../component";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");

      const data = response.data;

      setProducts(data);
    };
    getProducts();
  }, []);

  console.log(products);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        This is Products page
        <div>
          <button onClick={handleOpen}> Create Product</button>
        </div>
      </div>
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "whitesmoke",
              width: 200,
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
            }}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}

      <ModalCreateProduct handleClose={handleClose} open={open}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c">
            <h3>Create Product</h3>
          </div>
          <input placeholder="Name"></input>
          <input placeholder="Price"></input>
          <input placeholder="Description"></input>
          <input placeholder="Category"></input>

          <div className="d-flex just-s-evenly margin-top-10">
            <button>Create</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </ModalCreateProduct>
    </div>
  );
};
