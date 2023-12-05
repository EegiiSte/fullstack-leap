import { Button, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../component";

export const DeleteProductModal = (props) => {
  const { handleCloseDelete, openDelete, id } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleDeleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      console.log(`Successfully deleted`, id);
      handleCloseDelete();
      navigate("/products");

      messageApi.open({
        type: "success",
        content: "Product Deleted successfully",
      });
    } catch (err) {
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
      {contextHolder}
    </div>
  );
};
