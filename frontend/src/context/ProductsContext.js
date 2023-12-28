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

          const sum_ii = (n) => {
            let sum = 0;

            for (let i = 1; i < n + 1; i++) {
              sum = sum + 10 ** i - 1;
            }
            return sum;
          };

          console.log("ProductPage", sum_ii(7));

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
    setProducts([product, ...products]);
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

  const Delete_Product = async (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
  };

  return (
    <ProductsContext.Provider
      value={{
        Set_Products,
        Create_Product,
        Update_Product,
        Delete_Product,
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
