import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Header } from "../../component";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export const SignUp = () => {
  const [user, setUser] = useState([]);

  const { signUp } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(
      "Received values of form: ",
      values.name,
      values.password,
      values.email
    );

    try {
      // throw new Error("test error");
      const response = await axios.post("http://localhost:8080/users/sign-up", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));

      if (data) {
        signUp(data);
        setUser(data.user);
        successNotification(`Sign Up successfully, Hello ${user.email}`);

        navigate("/");
      } else {
        errorNotification("Sign up failed, please try again");
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        errorNotification(err.response.data);
      } else {
        errorNotification("Unkown error");
      }

      console.log("SignUpModal-->onFinish ", err);
    }
  };
  return (
    <div className="d-flex align-c flex-direction-c just-c">
      <Header />
      <h1>Sign Up</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "1",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          initialValue={"test13"}
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          initialValue={
            process.env.NODE_ENV === "development" ? "test13@gmail.com" : ""
          }
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          initialValue={"12345678aaa$$R"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              simbols: true,
              message: "must included simbols!",
            },
            {
              minlength: 6,
              message: "minimium must include 6 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          initialValue={"12345678aaa$$R"}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
