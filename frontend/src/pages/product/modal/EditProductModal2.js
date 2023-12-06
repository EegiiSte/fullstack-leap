import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../../component/modal";

export const EditProductModal2 = (props) => {
  const { handleClose, open, selectedProduct, id } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const handleEditButton = async (values) => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, values);
      console.log(`Successfully Edited`, id);
      handleClose();

      messageApi.open({
        type: "success",
        content: "Product edited successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <Form
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
              <Input defaultValue={selectedProduct.name} />
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
                defaultValue={selectedProduct.price}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input defaultValue={selectedProduct.description} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input defaultValue={selectedProduct.category} />
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
      {contextHolder}
    </div>
  );
};
