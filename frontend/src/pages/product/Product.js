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

  console.log(selectedProduct);

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
      {selectedProduct && (
        <div
          style={{
            backgroundColor: "whitesmoke",
            height: "50%",
            width: "80%",
            borderRadius: "10px",
            padding: "20px",
            margin: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "40%",
            }}
          >
            <h3>Name : {selectedProduct.name}</h3>
            <p>Description : {selectedProduct.description}</p>
            <p>Price : {selectedProduct.price}</p>
            <p>Category : {selectedProduct.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};
