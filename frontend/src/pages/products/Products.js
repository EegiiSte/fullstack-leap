import { Button, Card, ColorPicker, Flex, Space, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { MatrixBG } from "../../component/matrix";
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
  const [cardBoxColor, setCardBoxColor] = useState("#0000006c");
  const [textColor, setTextColor] = useState("white");

  // console.log("Products", bgColor);

  // console.log("Products", products)

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
                // backgroundColor: theme === "light" ? "white" : cardBoxColor,
                backgroundColor: theme === "light" ? "white" : "#0000007c",
                color: theme === "light" ? "black" : textColor,
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
              className="d-flex flex-direction-c just-s-evenly "
              key={product.id}
              style={{
                border: "1px solid white",
                // boxShadow:
                //   theme === "light"
                //     ? "0px 0px 10px gray"
                //     : "0px 0px 20px white",
                backgroundColor: theme === "light" ? "white" : cardBoxColor,
                width: 200,
                height: 160,
                borderRadius: "10px",
                padding: "20px",
                margin: "20px",
                color: theme === "light" ? "black" : textColor,
              }}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <p
                className="d-flex just-c"
                style={{
                  width: "30%",
                  borderRadius: "5px",

                  backgroundColor: product.type === "public" ? "green" : "gray",
                }}
              >
                {product.type}
              </p>
              <div className="d-flex flex-wrap-wrap just-c align-c">
                <h3>Name : {product.name}</h3>
                <p>Price : {product.price}</p>
                <p>Description : {product.description}</p>
                <p>Category : {product.category}</p>
              </div>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                Created User : {product.userEmail}
              </p>
            </div>
          ))}
      </Flex>

      <CreateProductModal handleClose={handleClose} open={open} />
    </div>
  );
};

// <Card
//               hoverable
//               style={{
//                 flexWrap: "wrap",
//                 width: 260,
//                 height: 194,
//               }}
//               bodyStyle={{
//                 borderRadius: "10px",
//                 // padding: 10,
//                 overflow: "hidden",
//                 backgroundColor:
//                   theme === "light" ? "transperint" : cardBoxColor,
//               }}
//               onClick={() => navigate(`/products/${product._id}`)}
//             >
//               <Flex justify="center">
//                 <Flex
//                   vertical
//                   align="center"
//                   justify="center"
//                   style={{
//                     // padding: 10,
//                     fontSize: 10,
//                   }}
//                 >
//                   <Typography
//                     level={2}
//                     style={{
//                       fontSize: 14,
//                       color: theme === "light" ? "black" : textColor,
//                     }}
//                   >
//                     <p>Name : {product.name}</p>
//                     <p>Price : {product.price}</p>
//                     <p>Description : {product.description}</p>
//                     <p>Category : {product.category}</p>
//                   </Typography>
//                 </Flex>
//               </Flex>
//             </Card>
