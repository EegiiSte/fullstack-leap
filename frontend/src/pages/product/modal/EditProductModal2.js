import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../../component/modal";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";
import { useProductsContext } from "../../../context/ProductsContext";

export const EditProductModal2 = (props) => {
  const { handleClose, open, selectedProduct, id } = props;
  const { Update_Product } = useProductsContext();
  const { currentUser } = useUserContext();

  const { successNotification, warningNotification } = useNotificationContext();

  const handleEditButton = async (values) => {
    const updatedProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
    };

    try {
      if (
        updatedProduct.name === selectedProduct.name ||
        updatedProduct.price === selectedProduct.price ||
        updatedProduct.description === selectedProduct.description ||
        updatedProduct.category === selectedProduct.category
      ) {
        warningNotification("Nothing changed");
        handleClose();
      } else {
        const response = await axios.put(
          `http://localhost:8080/products/${id}`,
          updatedProduct,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;

        Update_Product(data);

        successNotification("Product edited successfully");
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <Form
            initialValues={{
              name: selectedProduct.name,
              description: selectedProduct.description,
              category: selectedProduct.category,
              price: selectedProduct.price,
            }}
            name="trigger"
            onFinish={(values) => {
              handleEditButton(values);
            }}
            onFinishFailed={(errorInfo) => {
              console.log(errorInfo);
            }}
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Required" },
                { min: 4, message: "4oos ih baih" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ min: 1, required: true, type: "number" }]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <div className="d-flex just-s-evenly margin-top-10 gap-10">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: "100%" }}
              >
                Submit
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};
