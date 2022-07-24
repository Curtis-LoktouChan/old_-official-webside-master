import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { persistor } from "../../../store/index";

import "./index.css";

import logo from "./logo.png";

import { Image, Menu, Dropdown, Button, Row, Col } from "antd";
import { UserOutlined, SmileTwoTone } from "@ant-design/icons";

import { actions, userLoginStatus } from "../../../constant/index";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.loginMenu = (
      <Menu>
        <Menu.Item>
          <Link style={{ color: "#1890ff" }} to="/login">
            登录
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link style={{ color: "#1890ff" }} to="/signUp">
            注册
          </Link>
        </Menu.Item>
      </Menu>
    );
    this.loggedInMenu = (
      <Menu>
        <Menu.Item>
          <Link style={{ color: "black" }} to="/customerCenter">
            我的信息
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {/* 切记要使用 bind, 即使会 update 组件, 
                否则会造成 this 丢失, this.handleSignOut 会将 this 指向 undefined */}
        <Menu.Item
          style={{ color: "#black" }}
          onClick={this.handleSignOut.bind(this)}
        >
          退出登录
        </Menu.Item>
      </Menu>
    );
  }
  handleSignOut() {
    // 清除持久化存储
    persistor.purge();
    persistor.pause();
    this.props.dispatch({
      type: actions.SIGN_OUT,
    });
  }

  loginOrNot() {
    const { username, status } = this.props;
    if (status === userLoginStatus.SUCCEED) {
      return (
        <Row>
          <Col span={2} offset={4}>
            <Dropdown
              className="loggedInDropdown"
              overlay={this.loggedInMenu}
              placement="bottomLeft"
              arrow
              onClick={(e) => e.preventDefault()}
            >
              <div>
                <SmileTwoTone />
                <span>{username}</span>
              </div>
            </Dropdown>
          </Col>
        </Row>
      );
    } else {
      return (
        <Dropdown
          className="loginDropdown"
          overlay={this.loginMenu}
          placement="bottomLeft"
          arrow
        >
          <UserOutlined />
        </Dropdown>
      );
    }
  }
  render() {
    return (
      <div className="headerContainer">
        <div className="navigationBar">
          <div className="navigationBarFirst">
            <Link to="/home">
              <Image src={logo} width={150} preview={false} />
            </Link>
          </div>
          <div className="navigationBarSecond">
            <Link to="/waitToDo">
              <Button type="link">关于我们</Button>
            </Link>
            <Link to="/courseCenter">
              <Button type="link">课程中心</Button>
            </Link>
            <Link to="/caseShow">
              <Button type="link">案例展示</Button>
            </Link>
            <Link to="/softDownload">
              <Button type="link">下载软件</Button>
            </Link>
            <Link to="/userCenter">
              <Button type="link">个人中心</Button>
            </Link>
          </div>
          <div className="navigationBarThird">
            {/* 直接执行 loginOrNot 取得返回值 */}
            {this.loginOrNot()}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const { status } = this.props;

    if (status !== userLoginStatus.SUCCEED && token) {
      this.props.dispatch({
        type: actions.LOGIN_WITH_TOKEN,
        token: token,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // 使用 user
    ...state.user,
  };
};

export default connect(mapStateToProps)(Header);
