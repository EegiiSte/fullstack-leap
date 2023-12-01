import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";

import "./Product.css";

export const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState();

  const { id } = useParams();

  console.log(`Product -> id ${id}`);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        const data = await response.data;

        setSelectedProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    return () => fetchProduct();
  }, [id]);

  console.log(selectedProduct.name);

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
        This is Single Product page
      </div>
      <div
        style={{
          backgroundColor: "whitesmoke",
          height: "50%",
          width: "80%",
          borderRadius: "10px",
          padding: "20px",
          margin: "20px",
        }}
      ></div>
    </div>
  );
};
