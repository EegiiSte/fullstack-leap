import { Button, Form, Input, InputNumber, Radio } from "antd";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Modal } from "../../component";
import { useNotificationContext } from "../../context/NotificationContext";
import { useProductsContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";
import { storage } from "../../firebase/firebase";

export const CreateProductModal = (props) => {
  const { handleClose, open } = props;

  const { currentUser } = useUserContext();
  const { Create_Product } = useProductsContext();

  //input values
  const { successNotification } = useNotificationContext();

  const [value3, setValue3] = useState("public");

  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };

  const options = [
    {
      label: "public",
      value: "public",
    },
    {
      label: "private",
      value: "private",
    },
  ];
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [file, setFile] = useState();

  const uploadImage = async () => {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };

  const dulmaa = async (values) => {
    const imageUrl = await uploadImage();

    // console.log("CreateProductModal-imageUrl", imageUrl);

    console.log("CreateProductModal", { ...values, image: imageUrl });

    // console.log(`dulmaagaas - ${values}`, values);

    const response = await axios.post(
      // "https://fullstack-backend-pm5t.onrender.com/products",
      "http://localhost:8080/products/",
      { ...values, image: imageUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    const data = await response.data;

    // console.log("CreateProductModal-data", data);

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

            <Form.Item label="image" name="image">
              <label>File</label>
              <input
                name="Image"
                onChange={handleFileChange}
                placeholder="choose file"
                type="file"
              ></input>
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Required" }]}
            >
              <Radio.Group
                options={options}
                onChange={onChange3}
                value={value3}
                optionType="button"
                buttonStyle="solid"
              />
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
