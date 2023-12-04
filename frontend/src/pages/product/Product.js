import { Button, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { DeleteProductModal } from "./DeleteProductModal";
import { EditProductModal } from "./EditProductModal";

import "./Product.css";

export const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState();

  const { id } = useParams();
  //state for edit modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //state for delete modal
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //   console.log(`Product -> id ${id}`);

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

  //   console.log(selectedProduct);

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
        This is Single Product page
        <Flex className="gap-10" wrap="wrap" gap="small">
          <Button block onClick={handleOpen}>
            {" "}
            Edit
          </Button>
          <Button block onClick={handleOpenDelete}>
            {" "}
            Delete
          </Button>
        </Flex>
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

      <EditProductModal
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
      />
      <DeleteProductModal
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        selectedProduct={selectedProduct}
        id={id}
      />
    </div>
  );
};
