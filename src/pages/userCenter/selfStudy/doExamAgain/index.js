import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Radio,
  Divider,
  Row,
  Checkbox,
  Tag,
  Space,
  message,
  Col,
  Steps,
  PageHeader,
} from "antd";

import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { LeftCircleTwoTone } from "@ant-design/icons";
import http from "../../../../utils/http";
import { actions } from "../../../../constant/index";

const { Step } = Steps;

function getExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/selfStudy/getExamByKnowledge", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function submitExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/selfStudy/submitExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "updateAnswer":
      let newState = Object.assign({}, state);
      if (!state.data) {
        newState = Object.assign({}, state, action);
        return newState;
      }
      let Len = newState.data.filter((item, index) => {
        if (
          item.examID === action.data[0].examID &&
          item.type === action.data[0].type
        ) {
          newState.data[index] = action.data[0];
          return false;
        } else {
          return true;
        }
      });
      if (Len.length === newState.data.length) {
        newState.data.push(action.data[0]);
      }
      return newState;
    case "decrement":
      return Object.assign({}, state, action);
    default:
      throw new Error();
  }
}

function DoExam(props) {
  const initialState = {};
  const [state, dispatch] = useReducer(reducer, initialState);

  const [examState, setExamState] = useState(null);
  const history = useHistory();
  const { selfStudySubject, classID } = props;
  const { knowledge } = history.location.state;
  const mydispatch = props.dispatch;

  const confirmSubmit = () => {
    submitExamReq(state.data).then((res) => {
      message.info(res.msg);
      if (props.roleId === "2") {
        history.push("/userCenter/selfStudy/recommend", {
          isSkipRecommend: false,
          knowledge_list: null,
        });
      } else if (props.roleId === "1") {
        history.push("/userCenter/student/selfStudy/recommend", {
          isSkipRecommend: false,
          knowledge_list: null,
        });
      }
    });
  };

  useEffect(() => {
    getExamReq({ subject: selfStudySubject, knowledge: knowledge })
      .then((res) => {
        const exams = res.data;
        setExamState(exams);
        mydispatch({
          type: actions.SAVE_CLASSINFO,
          examLength: exams.length,
        });
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
  }, [selfStudySubject, knowledge, mydispatch, history]);

  return (
    <div>
      <PageHeader
        title={props.className}
        style={{ background: "#1890ff26", marginBottom: "30px" }}
        onBack={() => {
          history.push("/userCenter");
        }}
        backIcon={
          <span>
            <LeftCircleTwoTone style={{ fontSize: "20px" }} />
            &nbsp; 返回到班级
          </span>
        }
      />
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col span={18}>
          <Steps current={2} size="large">
            <Step title="能力水平初探" />
            <Step title="查看结果" />
            <Step title="查漏补缺" />
            <Step title="生成推荐" />
          </Steps>
        </Col>
      </Row>

      {examState !== null ? (
        <Form scrollToFirstError onFinish={confirmSubmit}>
          <Row>
            <Col offset={2}>
              {ExamQuestions(examState, dispatch, classID)}
              <Form.Item></Form.Item>
            </Col>
          </Row>
          <Row align="center">
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Row>
        </Form>
      ) : null}
    </div>
  );
}

const ExamQuestions = (exams, dispatch, selfStudyClassID) => {
  if (!exams) {
    return;
  }
  let question = [];

  const selectExcept = (e, examID) => {
    dispatch({
      type: "updateAnswer",
      data: [{ examID, myAnswer: e.target.value, selfStudyClassID }],
    });
  };
  const selectMultiple = (ans, examID) => {
    let answer = ans.sort().join("");
    dispatch({
      type: "updateAnswer",
      data: [{ examID, myAnswer: answer, selfStudyClassID }],
    });
  };

  exams.forEach((exam, index) => {
    question.push(
      <div style={{ margin: " 0px 20px" }} key={index}>
        <Tag color="#2db7f5" style={{ size: "50px" }}>
          第{index + 1}题
        </Tag>
        <Tag color="blue">{exam.examType}</Tag>
        <BraftEditor
          value={BraftEditor.createEditorState(exam.examDiscrition)}
          contentStyle={{ height: "auto" }}
          controls={[]}
          readOnly
        />

        <Form.Item
          label="选择正确答案"
          name={`exam${index + 1}`}
          rules={[{ required: true, message: "请勾选正确答案！" }]}
          style={{ marginTop: "-40px" }}
        >
          {exam.examType === "多选题" ? (
            <Checkbox.Group
              onChange={(ans) => selectMultiple(ans, exam.ID)}
              style={{ width: "100%" }}
            >
              <Space direction="vertical">
                {exam.A === undefined || exam.A === "" ? null : (
                  <Checkbox value="A">A: {exam.A}</Checkbox>
                )}
                {exam.B === undefined || exam.B === "" ? null : (
                  <Checkbox value="B">B: {exam.B}</Checkbox>
                )}
                {exam.C === undefined || exam.C === "" ? null : (
                  <Checkbox value="C">C: {exam.C}</Checkbox>
                )}

                {exam.D === undefined || exam.D === "" ? null : (
                  <Checkbox value="D">D: {exam.D}</Checkbox>
                )}
                {exam.E === undefined || exam.E === "" ? null : (
                  <Checkbox value="E">E: {exam.E}</Checkbox>
                )}
                {exam.F === undefined || exam.F === "" ? null : (
                  <Checkbox value="F">F: {exam.F}</Checkbox>
                )}
              </Space>
            </Checkbox.Group>
          ) : (
            <Radio.Group onChange={(e) => selectExcept(e, exam.ID)}>
              <Space direction="vertical">
                {exam.A === undefined || exam.A === "" ? null : (
                  <Radio value="A">A: {exam.A}</Radio>
                )}
                {exam.B === undefined || exam.B === "" ? null : (
                  <Radio value="B">B: {exam.B}</Radio>
                )}
                {exam.C === undefined || exam.C === "" ? null : (
                  <Radio value="C">C: {exam.C}</Radio>
                )}
                {exam.D === undefined || exam.D === "" ? null : (
                  <Radio value="D">D: {exam.D}</Radio>
                )}
                {exam.E === undefined || exam.E === "" ? null : (
                  <Radio value="E">E: {exam.E}</Radio>
                )}
                {exam.F === undefined || exam.F === "" ? null : (
                  <Radio value="F">F: {exam.F}</Radio>
                )}
              </Space>
            </Radio.Group>
          )}
        </Form.Item>
        <Divider />
      </div>
    );
  });
  return question;
};

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
    ...state.user,
  };
};

export default connect(mapStateToProps)(DoExam);
