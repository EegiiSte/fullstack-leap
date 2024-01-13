import { Button, Flex } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
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
  const { currentUser } = useUserContext();

  const selectedProduct = products.find((product) => product._id === id);

  // console.log(`Product -> currentUser.email ${currentUser.user.email}`);
  // console.log(`Product -> selectedProduct.email ${selectedProduct.userEmail}`);

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div
        className="align-c d-flex "
        style={{
          flexDirection: "column",
          // backgroundColor: theme === "light" ? "#cbdaf0a8" : "#cbdaf0a8",
        }}
      >
        <Header />
        {theme === "light" ? (
          <div style={{ backgroundColor: "#cbdaf0a8" }} />
        ) : (
          <MatrixBG />
        )}
        <div
          className="padding-top-10 "
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            color: theme === "light" ? "black" : "white",
          }}
        >
          This is Single Product page
          {currentUser.user.email === selectedProduct.userEmail ? (
            <Flex className="gap-10" wrap="wrap" gap="small">
              <Button
                block
                onClick={handleOpen}
                style={{
                  backgroundColor: theme === "light" ? "white" : "#0000006c",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Edit
              </Button>
              <Button
                block
                onClick={handleOpenDelete}
                style={{
                  backgroundColor: theme === "light" ? "white" : "#0000006c",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Delete
              </Button>
            </Flex>
          ) : (
            <div />
          )}
        </div>
        {selectedProduct && (
          <div
            // className="box-shadow-gray"
            style={{
              border: "1px solid white",
              backgroundColor: theme === "light" ? "white" : "#0000007c",
              height: "70vh",
              width: "55%",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              className="d-flex flex-direction-c just-s-evenly "
              style={{
                width: "50%",
                height: "100%",
                color: theme === "light" ? "black" : "white",
              }}
            >
              <p
                className="d-flex just-c"
                style={{
                  width: "30%",
                  borderRadius: "5px",

                  backgroundColor:
                    selectedProduct.type === "public" ? "green" : "gray",
                }}
              >
                {selectedProduct.type}
              </p>
              <div
                className="d-flex flex-direction-c just-c align-start "
                style={{ gap: "10px" }}
              >
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Name :</p>
                    <p>{selectedProduct.name}</p>
                  </div>
                </p>
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Price : $</p>
                    <p>{selectedProduct.price}</p>
                  </div>
                </p>
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Category :</p> {selectedProduct.category}
                  </div>
                </p>
                <div className="d-flex flex-direction-c gap-10">
                  <span>Description : </span>
                  <span>{selectedProduct.description}</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                Created User : {selectedProduct.userEmail}
              </p>
            </div>
            <div
              className="d-flex flex-direction-c just-s-evenly "
              style={{
                width: "50%",
                height: "100%",
                color: theme === "light" ? "black" : "white",
                fontSize: "150%",
              }}
            >
              <img
                style={{
                  borderRadius: "5px",
                }}
                src={selectedProduct.image}
                alt={"productImage"}
                // width="350px"
                // height="150px"
              />
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
