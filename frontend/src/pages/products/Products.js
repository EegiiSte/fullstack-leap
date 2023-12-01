import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import "./Product.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
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
          justifyContent: "center",
        }}
      >
        This is Products page
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
    </div>
  );
};
