import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../component";
import { useNotificationContext } from "../../context/NotificationContext";
import { useProductsContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";

export const CreateProductModal = (props) => {
  const { handleClose, open } = props;

  const { currentUser } = useUserContext();
  const { Create_Product } = useProductsContext();

  //input values
  const { successNotification } = useNotificationContext();

  const dulmaa = async (values) => {
    // console.log(`dulmaagaas - ${values}`, values);
    const response = await axios.post(
      "https://fullstack-backend-pm5t.onrender.com/products",
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    const data = await response.data;

    Create_Product(data);
    handleClose();
    successNotification("Create Product successfully");
  };

  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c">
            <h3>Create Product</h3>
          </div>

          <Form
            name="trigger"
            onFinish={(values) => {
              dulmaa(values);
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
                Create
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
        </div>
      </Modal>
    </div>
  );
};
