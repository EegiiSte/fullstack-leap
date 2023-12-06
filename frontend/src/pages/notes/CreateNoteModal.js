import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../component";

export const CreateNoteModal = (props) => {
  const { handleClose, open, reload } = props;

  //input values
  const [messageApi, contextHolder] = message.useMessage();

  const baldan = async (values) => {
    console.log(`baldangaas - ${values}`, values);
    await axios.post("http://localhost:8080/notes", values);

    handleClose();

    messageApi.open({
      type: "success",
      content: "Create Note successfully",
    });

    reload();
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
              baldan(values);
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
              label="Goal"
              name="goal"
              rules={[{ min: 1, required: true }]}
            >
              <Input
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
      {contextHolder}
    </div>
  );
};