import { Button } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../component";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";

export const DeleteProductModal = (props) => {
  const { handleCloseDelete, openDelete, id } = props;

  const { currentUser, userContextLoading } = useUserContext();

  const { successNotification, errorNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleDeleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log(`Successfully deleted`, id);
      handleCloseDelete();
      navigate("/products");

      successNotification("Product Deleted successfully");
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
