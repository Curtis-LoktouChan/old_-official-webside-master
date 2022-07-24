import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import Header from "../../components/header";
import Footer from "../../components/footer";
import IntoClass from "./intoClass";
import MyClassList from "./myclassList";
import SelfStudyIntroduction from "../selfStudy/introduction";
import DoExam from "../selfStudy/doExam";
import ScoreResult from "../selfStudy/scoreResult";
import ViewSolution from "../selfStudy/viewSolution";
import DoExamAgain from "../selfStudy/doExamAgain";
import Recommend from "../selfStudy/recommend";

import { DesktopOutlined, FileWordFilled } from "@ant-design/icons";

function StudentSider(props) {
  const [collapsed, SetCollapsed] = useState(0);
  const menuRef = useRef(null);
  const history = useHistory();
  const [selectedKey, SetSelectedKey] = useState("myClass");

  const onClick = (item) => {
    SetSelectedKey(item.key);
    switch (item.key) {
      case "myClass":
        history.push("/userCenter/student/myClassList");
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
      <Layout style={{ background: "#ffffff" }}>
        <Header />
      </Layout>
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
          width="130px"
          reverseArrow="true"
        >
          <Menu
            ref={menuRef}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[`${selectedKey}`]}
            mode="inline"
            onClick={onClick}
            style={{ background: "white" }}
          >
            <Menu.Item icon={<DesktopOutlined />} key="myClass">
              我的班级
            </Menu.Item>
            <Menu.Item icon={<FileWordFilled />} key="myWork">
              我的作品
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
            <Route
              path="/userCenter/student/myClassList"
              component={MyClassList}
            />
            <Route path="/userCenter/student/intoClass" component={IntoClass} />

            {/* 自适应学习系统的路由 */}
            <Route
              path="/userCenter/student/selfStudy/introdution"
              component={SelfStudyIntroduction}
            />
            <Route
              path="/userCenter/student/selfStudy/doExam"
              component={DoExam}
            />
            <Route
              path="/userCenter/student/selfStudy/scoreResult"
              component={ScoreResult}
            />
            <Route
              path="/userCenter/student/selfStudy/viewSolution"
              component={ViewSolution}
            />
            <Route
              path="/userCenter/student/selfStudy/doExamAgain"
              component={DoExamAgain}
            />
            <Route
              path="/userCenter/student/selfStudy/recommend"
              component={Recommend}
            />
            <Redirect
              to="/userCenter/student/myClassList"
              component={MyClassList}
            />
          </Switch>
          <Layout.Footer style={{ marginTop: "50px" }} align="middle">
            <Footer></Footer>
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

function StudentNavigation(props) {
  return (
    <div>
      <StudentSider></StudentSider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(StudentNavigation);
