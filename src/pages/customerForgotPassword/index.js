import React from "react";
import "./index.css";
import axios from "axios";

import {
  Form,
  Input,
  //   Select,
  //   Row,
  //   Col,
  Button,
} from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
      offset: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 4,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

export default class CustomerForgotPassword extends React.Component {
  onFinish = (values) => {
    const url = "http://localhost:3030/changeCustomer";
    const res = axios.get(url);
    res
      .then((res) => {
        const { data } = res;
        const { history } = this.props;
        if (data.status === "ok") {
          /** TODO: 跳转到成功页面 */
          history.replace("/changeSucceed");
        } else {
          /** TODO: 跳转到失败页面 */
          history.replace("/changeFailed");
        }
      })
      .catch((rej) => {
        console.log(rej);
      });
  };
  render() {
    return (
      <Form
        {...formItemLayout}
        name="register"
        onFinish={this.onFinish}
        scrollToFirstError
        className="signUPForm"
      >
        <Form.Item
          name="email"
          label="电子邮箱"
          rules={[
            {
              type: "email",
              message: "邮箱地址不正确！",
            },
            {
              required: true,
              message: "请输入你的邮箱！",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入6~14位密码",
              type: "string",
              min: 6,
              max: 14,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("两次输入的密码不一致！");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
