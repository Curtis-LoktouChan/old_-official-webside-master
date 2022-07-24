import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import {
  PageHeader,
  Button,
  Menu,
  Row,
  Col,
  Modal,
  Descriptions,
  InputNumber,
  message,
  Input,
  Form,
} from "antd";
import {
  LeftCircleTwoTone,
  BankFilled,
  AliwangwangFilled,
  PlusSquareFilled,
} from "@ant-design/icons";

import ClassMember from "./classMember";
import CourseMenu from "./courseMenu";
import CreateTextSection from "./courseMenu/createTextSection";
import ViewTextSection from "./courseMenu/viewTextSection";
import EditTextSection from "./courseMenu/editTextSection";
import http from "../../../../utils/http";
import EditExam from "./courseMenu/editExam";
import ViewExam from "./courseMenu/viewExam";
import ScoreResult from "./courseMenu/scoreResult";
import ViewSolution from "./courseMenu/viewSolution";
import UpdateExamList from "./courseMenu/updateExamList";
import UpdateExamPage from "./courseMenu/updateExamPage";
import ContinueAddExam from "./courseMenu/continueAddExam";
import SelectExam from "./courseMenu/selectExam";

const { TextArea } = Input;

function addStudentReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/addStudentsBatch", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function addChapterReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/addChapter", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function IntoClass(props) {
  const history = useHistory();
  const studentNumRef = useRef();
  const [chapterForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddChapterVisible, setAddChapterVisible] = useState(false);
  const [seletedMenuKey, setSeletedMenuKey] = useState("courseMenu");

  const subTitleClassID = "班级ID:" + props.classID + "  ";
  const subTitleInvitePwd = props.invitePwd
    ? `邀请码:${props.invitePwd}`
    : `邀请码:无`;
  const subTitle = subTitleClassID + subTitleInvitePwd;

  const showAddMemberModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    const newStudentNum = studentNumRef.current.state.inputValue;

    addStudentReq({ newStudentNum: newStudentNum, className: props.className })
      .then((res) => {
        message.success(res.msg);
        history.push("/userCenter/IntoClass/classMember");
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  // --------添加章节--------------------
  const showAddChapterModal = () => {
    setAddChapterVisible(true);
    chapterForm.setFieldsValue({ chapterTitle: "", chapterDiscrption: "" });
  };
  const handleAddChapterOk = () => {
    const chapterTitle = chapterForm.getFieldValue("chapterTitle");
    if (chapterTitle === undefined || chapterTitle === "") {
      message.warning("章节标题不能为空");
      return;
    }
    const chapterDiscription = chapterForm.getFieldValue("chapterDiscrption");
    addChapterReq({
      classID: props.classID,
      chapterTitle: chapterTitle,
      chapterDiscription: chapterDiscription,
    })
      .then((res) => {
        message.success(res.msg);
        history.push("/userCenter/IntoClass/courseMenu");
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
    setAddChapterVisible(false);
  };
  const handleAddChapterCancel = () => {
    setAddChapterVisible(false);
  };
  const handleClick = (menu) => {
    if (menu.key === "courseMenu") {
      setSeletedMenuKey("courseMenu");
      history.push("/userCenter/IntoClass/courseMenu");
    }

    if (menu.key === "classMember") {
      setSeletedMenuKey("classMember");
      history.push("/userCenter/IntoClass/classMember");
    }
  };
  useEffect(() => {
    const { pathname } = history.location;

    switch (pathname) {
      case "/userCenter/IntoClass/courseMenu":
        setSeletedMenuKey("courseMenu");
        break;
      case "/userCenter/IntoClass/classMember":
        setSeletedMenuKey("classMember");
        break;
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
        extra={[
          <Button
            key="2"
            onClick={() => {
              message.info("功能尚未开放");
            }}
            shape="round"
            type="primary"
          >
            编辑班级
          </Button>,
          <Button
            onClick={showAddMemberModal}
            key="1"
            shape="round"
            type="primary"
          >
            添加学员
          </Button>,
          <Button
            onClick={showAddChapterModal}
            key="3"
            shape="round"
            type="primary"
          >
            添加章节
          </Button>,
        ]}
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
            <Menu.Item key="classMember">
              <AliwangwangFilled />
              班级成员
            </Menu.Item>

            <Menu.Item key="3">
              <PlusSquareFilled />
              申请列表
            </Menu.Item>
            {/* <Menu.Item key="4">TODO</Menu.Item> */}
          </Menu>
        </Col>
        <Col span={21}>
          <Switch>
            <Route
              path="/userCenter/intoClass/classMember"
              component={ClassMember}
            />
            <Route
              path="/userCenter/intoClass/courseMenu"
              component={CourseMenu}
            />
            <Route
              path="/userCenter/intoClass/createTextSection"
              component={CreateTextSection}
            />
            <Route
              path="/userCenter/intoClass/viewTextSection"
              component={ViewTextSection}
            />
            <Route
              path="/userCenter/intoClass/editTextSection"
              component={EditTextSection}
            />
            <Route path="/userCenter/intoClass/viewExam" component={ViewExam} />
            <Route path="/userCenter/intoClass/editExam" component={EditExam} />
            <Route
              path="/userCenter/intoClass/scoreResult"
              component={ScoreResult}
            />
            <Route
              path="/userCenter/intoClass/updateExamPage"
              component={UpdateExamPage}
            />
            <Route
              path="/userCenter/intoClass/updateExamList"
              component={UpdateExamList}
            />
            <Route
              path="/userCenter/intoClass/viewSolution"
              component={ViewSolution}
            />
            <Route
              path="/userCenter/intoClass/continueAddExam"
              component={ContinueAddExam}
            />
            <Route
              path="/userCenter/intoClass/selectExam"
              component={SelectExam}
            />
            <Redirect
              to={{
                pathname: "/userCenter/intoClass/courseMenu",
              }}
            />
          </Switch>
        </Col>
      </Row>
      <Modal
        title="添加学员"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>
          输入班级人数，系统将自动批量创建相应数量的学员账户。学员使用分配的账户登录后，将自动加入班级。
        </p>
        <InputNumber
          style={{ marginRight: "10px", marginBottom: "10px" }}
          min={1}
          max={99}
          ref={studentNumRef}
        />
        位学员
        <p>（一个班级最多99个学生。)</p>
      </Modal>
      <Modal
        title="新建章节"
        visible={isAddChapterVisible}
        onOk={handleAddChapterOk}
        onCancel={handleAddChapterCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          form={chapterForm}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="章节标题"
            name="chapterTitle"
            rules={[{ required: true, message: "章节标题不能为空！" }]}
          >
            <TextArea size="small" showCount maxLength={100} />
          </Form.Item>
          <Form.Item label="章节描述" name="chapterDiscrption">
            <TextArea size="large" showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(IntoClass);
