import { Button } from "antd";
import React from "react";
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
  const {
    textColor,
    themeLoading,
    menuColor,
    backgroundColor,
    blackAndWhite,
    blackAndWhiteSmoke,
  } = useThemeContext();

  // console.log("Products", products);

  if (productContextLoading && themeLoading) {
    return <div>...Loading Products</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      <div className="d-flex just-s-evenly width-100pr padding-top-10">
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
            className="box-shadow-gray"
            key={product.id}
            style={{
              backgroundColor: blackAndWhiteSmoke,
              width: 200,
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              color: textColor,
            }}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <h3>Name : {product.name}</h3>
            <p>Price : {product.price}</p>
            <p>Description : {product.description}</p>
            <p>Category : {product.category}</p>
          </div>
        ))}

      <CreateProductModal handleClose={handleClose} open={open} />
    </div>
  );
};
