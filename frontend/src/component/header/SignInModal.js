import React, { useEffect, useState } from "react";
import { Header, HeadMUI } from "../../component";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Modal } from "../modal";
import axios from "axios";

export const SignInModal = (props) => {
  const { handleCloseSignInModal, openSignInModal, setUser, messageApi, user } =
    props;

  const onFinish = async (values) => {
    try {
      // throw new Error("test error");
      const response = await axios.post(
        "http://localhost:8080/users/sign-in",
        values
      );

      const data = await response.data;
      if (data) {
        console.log("SignInModal", data.user);

        setUser(data.user);

        messageApi.open({
          type: "success",
          content: `Sign in successfully`,
        });

        handleCloseSignInModal();
      } else {
        console.log("SignInModal", data);
        messageApi.open({
          type: "error",
          content: "Sign in failed, please try again",
        });
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        messageApi.open({
          type: "error",
          content: err.response.data,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Unkown error",
        });
      }

      console.log("SignInModal-->onFinish ", err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal handleClose={handleCloseSignInModal} open={openSignInModal}>
      <div className="d-flex align-c flex-direction-c just-c">
        <h1>Login</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            initialValue={
              process.env.NODE_ENV === "development" ? "test9@gmail.com" : ""
            }
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
