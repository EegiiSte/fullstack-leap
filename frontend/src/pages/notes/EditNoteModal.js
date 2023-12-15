import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../../component/modal";
import { useNotificationContext } from "../../context/NotificationContext";

export const EditNoteModal = (props) => {
  const { handleClose, open, selectedNote, id } = props;

  const { successNotification, errorNotification } = useNotificationContext();

  const handleEditButton = async (values) => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, values);
      console.log(`Successfully Edited`, id);
      handleClose();

      successNotification("Product edited successfully");
    } catch (err) {
      errorNotification(err?.message);
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedNote && (
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
              <Input defaultValue={selectedNote.name} />
            </Form.Item>
            <Form.Item
              label="Goal"
              name="goal"
              rules={[{ min: 1, required: true, type: "number" }]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                defaultValue={selectedNote.goal}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input defaultValue={selectedNote.description} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input defaultValue={selectedNote.category} />
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
