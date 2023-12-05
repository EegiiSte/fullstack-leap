import { Button, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../../../component";
import * as Yup from "yup";

export const EditProductModal = (props) => {
  const { handleClose, open, selectedProduct, id } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [formValues, setFormValues] = useState({
    name: selectedProduct.name,
    price: selectedProduct.price,
    description: selectedProduct.description,
    category: selectedProduct.category,
  });
  console.log(`EditProductModal=> ${selectedProduct}`);

  const [editedFormValues, setEditedFormValues] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
    setEditedFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleCloseButton = () => {
    setFormValues({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      category: selectedProduct.category,
    });
    handleClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleEditButton = async () => {
    try {
      await validationSchema.validate(editedFormValues, { abortEarly: false });
      await axios.put(`http://localhost:8080/products/${id}`, editedFormValues);

      console.log(`Successfully Edited`, id);
      handleClose();

      await messageApi.open({
        type: "success",
        content: "Product edited successfully",
      });
      //   window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <div className="d-flex flex-direction-c gap-10">
            <div className="d-flex just-c">
              <h3>Edit Product</h3>
            </div>
            <input
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleInputChange}
            ></input>
            <input
              name="price"
              placeholder="Price"
              value={formValues.price}
              onChange={handleInputChange}
            ></input>
            <input
              name="description"
              placeholder="Description"
              value={formValues.description}
              onChange={handleInputChange}
            ></input>
            <input
              name="category"
              placeholder="Category"
              value={formValues.category}
              onChange={handleInputChange}
            ></input>

            <div className="d-flex just-s-evenly margin-top-10">
              <Button
                type="primary"
                block
                style={{ width: "100%" }}
                onClick={() => {
                  handleEditButton(id);
                }}
              >
                Submit
              </Button>
              <Button
                block
                onClick={handleCloseButton}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
      {contextHolder}
    </div>
  );
};
