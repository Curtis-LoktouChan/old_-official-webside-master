import React from "react";
import "./index.css";

import { connect } from "react-redux";

import { actions } from "../../constant";

import {
  Form,
  Input,
  Tooltip,
  //   Select,
  //   Row,
  //   Col,
  Checkbox,
  Button,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      // 1: 成功 2: 失败 3: 手机号不正确 4: 初始状态，空白
      sendCaptchaMessage: 4,
    };
  }
  handleSendCaptchaMessage = (e) => {
    e.preventDefault();
    if (!this.state.phone.match(/^1[0-9]{10}$/)) {
      this.setState({ sendCaptchaMessage: 3 });
      return null;
    }
    this.props.dispatch({
      type: actions.SEND_CAPTCHA_MESSAGE,
      data: this.state.phone,
    });
  };
  // 输入的字段改变
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  sendCaptchaMessageOrNot = () => {
    switch (this.state.sendCaptchaMessage) {
      case 1:
        return (
          <div style={{ color: "#1caf1c" }}>已发送验证码，请注意查收~</div>
        );
      case 2:
        return <div style={{ color: "red" }}>发送验证码失败，请稍后重试</div>;
      case 3:
        return <div style={{ color: "red" }}>请输入正确的手机号</div>;
      default:
        break;
    }
  };
  onFinish = (values) => {
    this.props.dispatch({
      type: actions.SEND_SIGN_UP_MESSAGE,
      info: values,
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

        <Form.Item
          name="username"
          label={
            <span>
              用户名&nbsp;
              <Tooltip title="输入你的用户名">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              whitespace: true,
              type: "string",
              min: 2,
              max: 10,
              message: "请输入2~10位字符",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telephone"
          label="电话号码"
          rules={[
            {
              required: true,
              message: "请输入正确的电话号码",
              pattern: /^1[0-9]{10}$/,
            },
          ]}
        >
          <Input
            name="phone"
            style={{
              width: "100%",
            }}
            value={this.state.phone}
            onChange={this.handleOnChange}
          />
        </Form.Item>
        {this.sendCaptchaMessageOrNot()}
        {/* <Form.Item label="验证码" extra="确认验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                required: true,
                                message: '请输入收到的验证码',
                                },
                            ]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button onClick={this.handleSendCaptchaMessage}>获取验证码</Button>
                        </Col>
                        <Col span={6} pull={2}>
                            {this.sendCaptchaMessageOrNot()}
                        </Col>
                    </Row>
                </Form.Item> */}

        <Form.Item
          {...tailFormItemLayout}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject("请同意用户协议"),
            },
          ]}
        >
          <Checkbox>
            {/* todo: Link 到用户协议 */}
            我已阅读{" "}
            <a href="/userProtocol" target="_blank">
              用户协议
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
  componentDidUpdate(oldProps) {
    if (oldProps !== this.props) {
      const { history } = this.props;
      if (this.props.sendCaptchaStatus) {
        this.setState({ sendCaptchaMessage: 1 });
      } else if (this.props.sendCaptchaStatus === false) {
        this.setState({ sendCaptchaMessage: 2 });
      }
      if (this.props.signUpStatus) {
        history.replace("/signUpSucceed");
      } else if (this.props.signUpStatus === false) {
        history.replace("/signUpFailed");
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.signUp,
  };
};

export default connect(mapStateToProps)(SignUp);
