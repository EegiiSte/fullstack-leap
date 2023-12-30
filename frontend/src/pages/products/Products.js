import { Button, Card, ColorPicker, Flex, Space, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { CreateProductModal } from "./CreateProductModal";
import "./Product.css";

export const Products = () => {
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { products, productContextLoading } = useProductsContext();
  const { theme } = useThemeContext();

  const [bgColor, setBgColor] = useState("#cbdaf0a8");
  const [cardBoxColor, setCardBoxColor] = useState("black");
  const [textColor, setTextColor] = useState("white");

  console.log("Products", bgColor);

  // console.log("Products", products)

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  }
  return (
    <div
      className="d-flex align-c flex-wrap-wrap just-c"
      style={{
        backgroundColor: theme === "light" ? "#cbdaf0a8" : bgColor,
      }}
    >
      <Header />
      <div
        className="d-flex flex-direction-c just-s-evenly width-100pr padding-top-10"
        style={{
          textShadow:
            theme === "light" ? "0px 0px 0px black" : "0px 0px 4px black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <div className="d-flex flex-direction-row just-s-evenly">
          This is Products page
          <div>
            <Button
              block
              onClick={handleOpen}
              style={{
                backgroundColor: theme === "light" ? "white" : cardBoxColor,
                color: theme === "light" ? "black" : textColor,
              }}
            >
              Create Product
            </Button>
          </div>
        </div>
        <div className="d-flex flex-direction-row just-s-evenly">
          <div className="d-flex flex-direction-row align-c gap-10">
            <p>Background Color</p>
            <ColorPicker
              showText
              value={bgColor}
              onChangeComplete={(color) => {
                setBgColor(color.toHexString());
              }}
            />
          </div>
          <div className="d-flex flex-direction-row align-c gap-10">
            <p>Card Box Color</p>
            <ColorPicker
              showText
              value={cardBoxColor}
              onChangeComplete={(color) => {
                setCardBoxColor(color.toHexString());
              }}
            />
          </div>
          <div className="d-flex flex-direction-row align-c gap-10">
            <p>Text Color</p>
            <ColorPicker
              showText
              value={textColor}
              onChangeComplete={(color) => {
                setTextColor(color.toHexString());
              }}
            />
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
            <Card
              hoverable
              style={{
                flexWrap: "wrap",
                width: 260,
                height: 200,
              }}
              bodyStyle={{
                borderRadius: "10px",
                padding: 10,
                overflow: "hidden",
                backgroundColor: theme === "light" ? "white" : cardBoxColor,
              }}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <Flex justify="center">
                <Flex
                  vertical
                  align="center"
                  justify="center"
                  style={{
                    padding: 10,
                    fontSize: 10,
                  }}
                >
                  <Typography
                    level={3}
                    style={{
                      fontSize: 14,
                      color: theme === "light" ? "black" : textColor,
                    }}
                  >
                    <p>Name : {product.name}</p>
                    <p>Price : {product.price}</p>
                    <p>Description : {product.description}</p>
                    <p>Category : {product.category}</p>
                  </Typography>
                </Flex>
              </Flex>
            </Card>
            // <div
            //   // className="box-shadow-gray"
            //   key={product.id}
            //   style={{
            //     boxShadow:
            //       theme === "light" ? "0px 0px 10px gray" : "0px 0px 20px white",
            //     backgroundColor: theme === "light" ? "white" : "#769ce8",
            //     width: 200,
            //     borderRadius: "10px",
            //     padding: "20px",
            //     margin: "20px",
            //     color: theme === "light" ? "black" : "white",
            //   }}
            //   onClick={() => navigate(`/products/${product._id}`)}
            // >
            //   <h3>Name : {product.name}</h3>
            //   <p>Price : {product.price}</p>
            //   <p>Description : {product.description}</p>
            //   <p>Category : {product.category}</p>
            // </div>
          ))}
      </Flex>

      <CreateProductModal handleClose={handleClose} open={open} />
    </div>
  );
};
