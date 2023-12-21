import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component";
import { useNotificationContext } from "../../context/NotificationContext";
import { useUserContext } from "../../context/UserContext";

export const SignIn = (props) => {
  const { signIn } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // throw new Error("test error");
      const response = await axios.post("http://localhost:8080/users/sign-in", {
        email: values.email,
        password: values.password,
      });

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (data) {
        console.log("SignIn", data.user);

        signIn(data);

        successNotification(`Sign in successfully`);

        navigate("/");
      } else {
        errorNotification("Sign in failed, please try again");
      }
    } catch (err) {
      errorNotification(err?.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="d-flex align-c flex-direction-c just-c">
      <Header />
      <h1>Login in</h1>
      <Form
        className="padding-top-10"
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
          initialValue={"test9@gmail.com"}
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
          initialValue={"12345678aaa$$R"}
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
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
  );
};
