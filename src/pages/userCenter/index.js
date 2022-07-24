import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import Header from "../components/header";
import Footer from "../components/footer";
import CreateClass from "./classManage/createClass";
import MyClassList from "./classManage/myClassList";
import IntoClass from "./classManage/intoClass";
import SelfStudyIntroduction from "./selfStudy/introduction";
import DoExam from "./selfStudy/doExam";
import ScoreResult from "./selfStudy/scoreResult";
import ViewSolution from "./selfStudy/viewSolution";
import DoExamAgain from "./selfStudy/doExamAgain";
import Recommend from "./selfStudy/recommend";

import "./index.css";
import {
  DesktopOutlined,
  UserSwitchOutlined,
  FileWordFilled,
} from "@ant-design/icons";

function TeacherSider(props) {
  const [collapsed, SetCollapsed] = useState(0);
  const menuRef = useRef(null);
  const history = useHistory();
  const [selectedKey, SetSelectedKey] = useState("myClass");

  const onClick = (item) => {
    SetSelectedKey(item.key);
    switch (item.key) {
      case "myClass":
        history.push("/userCenter/myClassList");
        break;
      case "joinClass":
        history.push("/userCenter/student");
        break;
      case "myWork":
        history.push("/customerWork");
        break;
      default:
        break;
    }
  };

  const onCollapse = (collapsed) => {
    SetCollapsed(collapsed);
  };

  useEffect(() => {});
  return (
    <Layout>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          background: "white",
          borderRight: "2px solid #e6f7ff",
          borderTop: "2px solid #e6f7ff",
        }}
        width="120px"
        reverseArrow="true"
      >
        <Menu
          ref={menuRef}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[`${selectedKey}`]}
          mode="vertical"
          onClick={onClick}
          style={{ background: "white" }}
        >
          <Menu.Item icon={<DesktopOutlined />} key="myClass">
            我的班级
          </Menu.Item>

          <Menu.Item icon={<FileWordFilled />} key="myWork">
            我的作品
          </Menu.Item>
          <Menu.Item icon={<UserSwitchOutlined />} key="joinClass">
            学生身份
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout.Content
        style={{
          background: "white",
          margin: "0px 15px",

          borderLeft: "1px solid #003b9a1f",
        }}
      >
        <Switch>
          <Route path="/userCenter/myClassList" component={MyClassList} />
          <Route path="/userCenter/createClass" component={CreateClass} />
          <Route path="/userCenter/intoClass" component={IntoClass} />
          {/* 自适应学习系统的路由 */}
          <Route
            path="/userCenter/selfStudy/introdution"
            component={SelfStudyIntroduction}
          />
          <Route path="/userCenter/selfStudy/doExam" component={DoExam} />
          <Route
            path="/userCenter/selfStudy/scoreResult"
            component={ScoreResult}
          />
          <Route
            path="/userCenter/selfStudy/viewSolution"
            component={ViewSolution}
          />
          <Route
            path="/userCenter/selfStudy/doExamAgain"
            component={DoExamAgain}
          />
          <Route path="/userCenter/selfStudy/recommend" component={Recommend} />
          <Redirect to="/userCenter/myClassList" component={MyClassList} />
        </Switch>
        <Layout.Footer style={{ marginTop: "120px" }} align="middle">
          <Footer></Footer>
        </Layout.Footer>
      </Layout.Content>
    </Layout>
  );
}

function UserCenter(props) {
  let displaySider;
  const history = useHistory();
  if (props.roleId === "2") {
    //角色id为2是教师，展示教师sider
    displaySider = <TeacherSider />;
  } else if (props.roleId === "1") {
    history.push("/userCenter/student");
  } else if (!props.status) {
    history.push("/waitToLogin");
  }

  return (
    <Layout>
      <Layout style={{ background: "#ffffff" }}>
        <Header />
      </Layout>
      <Layout></Layout>
      <Layout>{displaySider}</Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(UserCenter);
