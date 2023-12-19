import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const ProductsContext = createContext();

export const ProductContexProvider = ({ children }) => {
  const { currentUser, userContextLoading } = useUserContext();

  const [products, setProducts] = useState([]);

  const [productContextLoading, setProductContextLoading] = useState(true);

  useEffect(() => {
    if (!userContextLoading) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8080/products", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });

          const data = await response.data;
          setProducts(data);
          setProductContextLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        fetchProducts();
      }
      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading]);

  const Set_Products = (products) => {
    setProducts(products);
  };

  const Create_Product = async (product) => {
    setProducts([...products, product]);
  };

  const Update_Product = async (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
  };

  return (
    <ProductsContext.Provider
      value={{
        Set_Products,
        Create_Product,
        Update_Product,
        products,
        productContextLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
