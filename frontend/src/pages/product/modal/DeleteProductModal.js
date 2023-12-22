import { Button } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../component";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useProductsContext } from "../../../context/ProductsContext";
import { useUserContext } from "../../../context/UserContext";

export const DeleteProductModal = (props) => {
  const { handleCloseDelete, openDelete, id } = props;

  const { currentUser } = useUserContext();

  const { successNotification, errorNotification } = useNotificationContext();
  const { Delete_Product } = useProductsContext();

  const navigate = useNavigate();

  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // console.log(`Successfully deleted`, id);
      const data = await response.data;

      // console.log("DeleteProductModal", data._id);

      Delete_Product(data._id);

      successNotification("Product Deleted successfully");
      handleCloseDelete();
      navigate("/products");
    } catch (err) {
      errorNotification(err?.message);
      console.error(err);
    }
  };

  return (
    <div>
      <Modal handleClose={handleCloseDelete} open={openDelete}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c">
            <h3>Are You sure?</h3>
          </div>
          <div className="d-flex just-s-evenly margin-top-10 gap-10">
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ width: "100%" }}
              onClick={() => {
                handleDeleteButton(id);
              }}
            >
              Delete
            </Button>
            <Button
              block
              onClick={() => {
                handleCloseDelete();
              }}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
