import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { PageHeader, Menu, Row, Col, Descriptions } from "antd";
import { LeftCircleTwoTone, BankFilled } from "@ant-design/icons";

import CourseMenu from "./courseMenu";

import ViewTextSection from "./courseMenu/viewTextSection";
import ViewExam from "./courseMenu/viewExam";
import ScoreResult from "./courseMenu/scoreResult";
import ViewSolution from "./courseMenu/viewSolution";

function IntoClass(props) {
  const history = useHistory();

  const [seletedMenuKey, setSeletedMenuKey] = useState("courseMenu");

  const subTitleClassID = "班级ID:" + props.classID + "  ";
  const subTitleInvitePwd = props.invitePwd
    ? `邀请码:${props.invitePwd}`
    : "邀请码:无";
  const subTitle = subTitleClassID + subTitleInvitePwd;

  const handleClick = (menu) => {
    if (menu.key === "courseMenu") {
      setSeletedMenuKey("courseMenu");
      history.push("/userCenter/student/intoClass/courseMenu");
    }

    if (menu.key === "classMember") {
      setSeletedMenuKey("classMember");
      history.push("/userCenter/student/intoClass/classMember");
    }
  };
  useEffect(() => {
    const { pathname } = history.location;

    switch (pathname) {
      case "/userCenter/student/intoClass/courseMenu":
        setSeletedMenuKey("courseMenu");
        break;
      //   case "/userCenter/student/intoClass/classMember":
      //     setSeletedMenuKey("classMember");
      //     break;
      default:
        break;
    }
  }, [history.location]);

  return (
    <div>
      {" "}
      <PageHeader
        style={{ background: "#f4fbff" }}
        backIcon={<LeftCircleTwoTone style={{ fontSize: "20px" }} />}
        onBack={() => {
          history.goBack();
        }}
        title={props.className}
        subTitle={subTitle}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="班级简介">
            {props.classBrief}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Row>
        <Col span={3}>
          <Menu
            onClick={handleClick}
            style={{ height: "auto" }}
            selectedKeys={[seletedMenuKey]}
            mode="inline"
          >
            <Menu.Item key="courseMenu">
              <BankFilled />
              课程目录
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={21}>
          <Switch>
            <Route
              path="/userCenter/student/intoClass/courseMenu"
              component={CourseMenu}
            />
            <Route
              path="/userCenter/student/IntoClass/viewTextSection"
              component={ViewTextSection}
            />
            <Route
              path="/userCenter/student/IntoClass/viewExam"
              component={ViewExam}
            />
            <Route
              path="/userCenter/student/IntoClass/scoreResult"
              component={ScoreResult}
            />
            <Route
              path="/userCenter/student/IntoClass/viewSolution"
              component={ViewSolution}
            />
            <Redirect
              to={{
                pathname: "/userCenter/student/intoClass/courseMenu",
              }}
            />
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(IntoClass);
