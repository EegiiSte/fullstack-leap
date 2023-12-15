import React from "react";
import { Modal } from "../modal";

import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";

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
export const SignUpModal = (props) => {
  const { handleCloseSignUpModal, openSignUpModal, setUser, messageApi, user } =
    props;

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
      if (data) {
        console.log("SignUpModal -->", data.user);

        setUser(data.user);
        messageApi.open({
          type: "success",
          content: `Sign Up successfully, Hello ${user.email}`,
        });

        handleCloseSignUpModal();
      } else {
        console.log("SignUpModal-else->", data);

        messageApi.open({
          type: "error",
          content: "Sign up failed, please try again",
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

      console.log("SignUpModal-->onFinish ", err);
    }
  };

  return (
    <Modal handleClose={handleCloseSignUpModal} open={openSignUpModal}>
      <div className="d-flex align-c flex-direction-c just-c">
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
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
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
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
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
    </Modal>
  );
};

/*
const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
        <Option value="976">+976</Option>
      </Select>
    </Form.Item>
  );

 <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
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
            name="phoneNumber"
            label="Phone Number"
            initialValue={
              process.env.NODE_ENV === "development" ? "2061234567" : ""
            }
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          
          */
