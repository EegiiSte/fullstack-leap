import { Button, Flex, Image, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { MatrixBG } from "../../component/matrix";
import { CreateProductModal } from "./CreateProductModal";
import "./Product.css";
import {
  EditOutlined,
  DeleteOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { DeleteProductModal } from "../product/modal/DeleteProductModal";
import { EditProductModal2 } from "../product/modal/EditProductModal2";
import {
  useProductsContext,
  useThemeContext,
  useUserContext,
} from "../../context";

export const Products = () => {
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const { products, productContextLoading } = useProductsContext();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  //function for edit modal
  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct({});

    setNewImageUrl("");
  };

  //for delete modal
  const handleOpenDelete = (product) => {
    setOpenDelete(true);
    setSelectedProduct(product);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedProduct({});
  };

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}

      <div
        className=" d-flex flex-direction-c just-s-evenly width-100pr padding-top-10"
        style={{
          textShadow:
            theme === "light" ? "0px 0px 0px black" : "0px 0px 4px black",
          ...textStyle,
        }}
      >
        <div className=" d-flex flex-direction-row just-s-evenly">
          This is Products page
          <div>
            <Button
              block
              onClick={handleOpenCreate}
              style={{
                ...textStyle,
                backgroundColor: theme === "light" ? "white" : "#0000007c",
              }}
            >
              Create Product
            </Button>
          </div>
        </div>
      </div>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        {products &&
          products.map((product) => (
            <div
              className=" d-flex flex-direction-c just-s-evenly "
              key={product.id}
              style={{
                ...textStyle,
                border: "1px solid white",
                width: 240,
                height: 320,
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: theme === "light" ? "white" : "",
              }}
            >
              <div className="d-flex align-c just-c" style={{ height: "10%" }}>
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Created by : {product.userEmail}
                </p>
              </div>
              <div
                style={{
                  height: "40%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image height={"100%"} src={product.image} />
              </div>
              <div
                className="d-flex align-c just-start"
                // style={{ height: "10%" }}
              >
                <Tag color={product.type === "public" ? "success" : "cyan"}>
                  {product.type}
                </Tag>
              </div>
              <div
                className="d-flex flex-direction-c just-c"
                style={{ height: "30%", overflow: "hidden" }}
              >
                <div className="d-flex flex-direction-c just-c align-c">
                  <div
                    style={{
                      width: "80%",

                      justifyContent: "space-between",
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <p>Name : {product.name}</p>
                    <p>Price : ${product.price}</p>
                    <p style={{ height: "10" }}>
                      Description : {product.description.toString[(0, 1)]}
                    </p>
                    <p>Category : {product.category}</p>
                  </div>
                </div>
              </div>
              {product.userEmail === currentUser.user.email ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    icon={theme === "light" ? <EditOutlined /> : <EditFilled />}
                    onClick={() => handleOpen(product)}
                  />
                  <Button
                    icon={
                      theme === "light" ? <DeleteOutlined /> : <DeleteFilled />
                    }
                    onClick={() => handleOpenDelete(product)}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
      </Flex>

      <EditProductModal2
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
        id={selectedProduct._id}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
      />
      <DeleteProductModal
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        product={selectedProduct}
        id={selectedProduct._id}
      />
      <CreateProductModal
        handleCloseCreate={handleCloseCreate}
        openCreate={openCreate}
      />
    </div>
  );
};
