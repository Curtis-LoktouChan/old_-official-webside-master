import React from "react";
import "./index.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { actions, userLoginStatus } from "../../constant";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const formItemLayout = {
  wrapperCol: {
    sm: {
      span: 10,
      offset: 7,
    },
  },
};
class Login extends React.Component {
  state = {
    username: "",
    password: "",
    isHint: false,
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username.trim() === "" || password.trim() === "") {
      // 输入空
      this.setState({
        isHint: true,
      });
      return;
    }
    // 非空
    this.props.dispatch({
      type: actions.LOGIN,
      data: { username, password },
    });
  };

  render() {
    return (
      <Form
        {...formItemLayout}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入你的用户名！",
            },
          ]}
        >
          <Input
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名/邮箱"
            value={this.state.username}
            onChange={this.handleOnChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码！",
            },
          ]}
        >
          <Input
            name="password"
            style={{
              width: "100%",
            }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="/customerForgotPassword">
            忘了密码？
          </Link>
        </Form.Item>

        {/** 错误提醒 */}
        <Form.Item
          className={["alert-error", this.state.isHint ? "show" : "hide"].join(
            " "
          )}
        >
          <span>无效用户名或密码</span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={this.handleSubmit}
          >
            登录
          </Button>
          或者 <Link to="/signUp">现在注册！</Link>
        </Form.Item>
      </Form>
    );
  }

  // 只要页面更新，就会触发该钩子函数
  // 触发点：1.props改变 2.setState 3.forceUpdate
  componentDidUpdate(oldProps) {
    // 只有 props 发生改变，才应该做处理
    if (oldProps !== this.props) {
      const { status, history } = this.props;
      if (status === userLoginStatus.SUCCEED) {
        history.replace("/userCenter/");
      } else if (status === userLoginStatus.FAILED) {
        // 登录失败
        this.setState({
          isHint: true,
        });
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(Login);
