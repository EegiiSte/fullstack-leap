import { Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadMUI } from "../../component";
import { Header } from "../../component/header/Header";
import { CreateProductModal } from "./CreateProductModal";
import "./Product.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getProducts11 = async () => {
      const response = await axios.get("http://localhost:8080/products");

      const data = response.data;

      setProducts(data);
    };
    getProducts11();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8080/products");

    const data = response.data;

    setProducts(data);
  };

  //   console.log(products);
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <HeadMUI pathValue={2} />
      <div className="d-flex just-s-evenly width-100pr">
        This is Products page
        <div>
          <Button block onClick={handleOpen}>
            Create Product
          </Button>
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
            <h3>Name : {product.name}</h3>
            <p>Price : {product.price}</p>
            <p>Description : {product.description}</p>
            <p>Category : {product.category}</p>
          </div>
        ))}

      <CreateProductModal
        handleClose={handleClose}
        reload={() => {
          getProducts();
        }}
        open={open}
      />
      {contextHolder}
    </div>
  );
};
