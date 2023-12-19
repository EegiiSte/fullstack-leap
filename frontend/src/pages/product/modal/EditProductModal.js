import { Button, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../../../component";
import * as yup from "yup";
import { useUserContext } from "../../../context/UserContext";

export const EditProductModal = (props) => {
  const { handleClose, open, selectedProduct, id } = props;

  const { currentUser, userContextLoading } = useUserContext();

  const [messageApi, contextHolder] = message.useMessage();

  const [formValues, setFormValues] = useState({
    name: selectedProduct.name,
    price: selectedProduct.price,
    description: selectedProduct.description,
    category: selectedProduct.category,
  });
  // console.log(`EditProductModal=> ${selectedProduct}`);

  const [editedFormValues, setEditedFormValues] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [errorBoxColor, setErrorBoxColor] = useState({
    name: "#3D94FF",
    price: "#3D94FF",
    description: "#3D94FF",
    category: "#3D94FF",
  });

  const validationForm = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(4, "must be at least 4 characters"),
    price: yup.number().required("Price is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
  });

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    yup
      .reach(validationForm, inputName)
      .validate(inputValue)
      .then((response) => {
        setFormValues({ ...formValues, [inputName]: inputValue });
        setEditedFormValues({ ...editedFormValues, [inputName]: inputValue });
        setErrorMessages({ ...errorMessages, [inputName]: "" });
        setErrorBoxColor({ ...errorBoxColor, [inputName]: "green" });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessages({ ...errorMessages, [inputName]: error.message });
        setErrorBoxColor({ ...errorBoxColor, [inputName]: "red" });
      });
    setEditedFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleCloseButton = () => {
    setFormValues({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      category: selectedProduct.category,
    });

    setErrorMessages({
      name: "",
      price: "",
      description: "",
      category: "",
    });

    setErrorBoxColor({
      name: "#3D94FF",
      price: "#3D94FF",
      description: "#3D94FF",
      category: "#3D94FF",
    });

    handleClose();
  };

  const handleEditButton = async () => {
    if (
      formValues.name === "" ||
      formValues.description === "" ||
      formValues.category === "" ||
      formValues.price === 0
    ) {
      setErrorMessages({
        ...errorMessages,
        required: "All error must be cleared",
      });
    } else
      try {
        await axios.put(
          `http://localhost:8080/products/${id}`,
          editedFormValues,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

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
            <div className="with-100pr">
              <input
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleInputChange}
                style={{
                  border: `1px solid ${errorBoxColor.name}`,
                  width: "100%",
                  borderRadius: "5px",
                  height: "30px",
                }}
              ></input>
              <span style={{ fontSize: "10px", color: "red" }}>
                {errorMessages.name}
              </span>
            </div>
            <div className="with-100pr">
              <input
                name="price"
                placeholder="Price"
                value={formValues.price}
                onChange={handleInputChange}
                style={{
                  border: `1px solid ${errorBoxColor.price}`,
                  width: "100%",
                  borderRadius: "5px",
                  height: "30px",
                }}
              ></input>
              <span style={{ fontSize: "10px", color: "red" }}>
                {errorMessages.price}
              </span>
            </div>
            <div className="with-100pr">
              {" "}
              <input
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={handleInputChange}
                style={{
                  border: `1px solid ${errorBoxColor.description}`,
                  width: "100%",
                  borderRadius: "5px",
                  height: "30px",
                }}
              ></input>{" "}
              <span style={{ fontSize: "10px", color: "red" }}>
                {errorMessages.description}
              </span>
            </div>
            <div className="with-100pr">
              {" "}
              <input
                name="category"
                placeholder="Category"
                value={formValues.category}
                onChange={handleInputChange}
                style={{
                  border: `1px solid ${errorBoxColor.category}`,
                  width: "100%",
                  borderRadius: "5px",
                  height: "30px",
                }}
              ></input>{" "}
              <span style={{ fontSize: "10px", color: "red" }}>
                {errorMessages.category}
              </span>
            </div>

            <div className="d-flex just-s-evenly margin-top-10 gap-10">
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
