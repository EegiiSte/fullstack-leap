import { Button, Flex } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { DeleteProductModal } from "./modal/DeleteProductModal";
import { EditProductModal2 } from "./modal/EditProductModal2";

import "./Product.css";

export const Product = () => {
  const { id } = useParams();

  //state for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //state for delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //   console.log(`Product -> id ${id}`);
  const { products, productContextLoading } = useProductsContext();
  const { theme } = useThemeContext();

  const selectedProduct = products.find((product) => product._id === id);

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div
        className="align-c d-flex "
        style={{
          flexDirection: "column",
          backgroundColor: theme === "light" ? "#cbdaf0a8" : "#cbdaf0a8",
        }}
      >
        <Header />
        <div
          className="padding-top-10 "
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          This is Single Product page
          <Flex className="gap-10" wrap="wrap" gap="small">
            <Button
              block
              onClick={handleOpen}
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Edit
            </Button>
            <Button
              block
              onClick={handleOpenDelete}
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Delete
            </Button>
          </Flex>
        </div>
        {selectedProduct && (
          <div
            className="box-shadow-gray"
            style={{
              backgroundColor: theme === "light" ? "white" : "black",
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
                color: theme === "light" ? "black" : "white",
              }}
            >
              <h3>Name : {selectedProduct.name}</h3>
              <p>Description : {selectedProduct.description}</p>
              <p>Price : {selectedProduct.price}</p>
              <p>Category : {selectedProduct.category}</p>
            </div>
          </div>
        )}

        <EditProductModal2
          handleClose={handleClose}
          open={open}
          selectedProduct={selectedProduct}
          id={id}
        />
        <DeleteProductModal
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          selectedProduct={selectedProduct}
          id={id}
        />
      </div>
    );
  }
};

// <EditProductModal
// handleClose={handleClose}
// open={open}
// selectedProduct={selectedProduct}
// id={id}
// />
