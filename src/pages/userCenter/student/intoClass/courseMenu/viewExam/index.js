import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Radio, Divider, Row, Checkbox, Tag, Space } from "antd";
import { PageHeader, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { RollbackOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

function getExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/student/getExam", params, token).then(
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
    http("post", "/api/v1/student/submitExam", params, token).then(
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

function ViewExam(props) {
  const initialState = {};
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subTitileState, setSubTitileState] = useState(null);
  const [examState, setExamState] = useState(null);

  const history = useHistory();
  const { sectionType } = history.location.state;
  const { sectionID } = history.location.state;
  const { chapterID } = history.location.state;
  const { classID } = props;

  const onBack = () => {
    history.goBack();
  };

  const confirmSubmit = () => {
    submitExamReq(state.data).then((res) => {
      history.push("/userCenter/student/intoClass/scoreResult", { sectionID });
    });
  };

  useEffect(() => {
    getExamReq({ classID, sectionID, chapterID }).then((res) => {
      const { sectionTitle } = res.data;
      const { exams } = res.data;

      setSubTitileState(sectionTitle);
      setExamState(exams);
    });
  }, [classID, sectionID, chapterID]);

  return (
    <div style={{ margin: "0px 20px" }}>
      <PageHeader
        backIcon={
          <Card
            cover={
              <RollbackOutlined
                style={{
                  fontSize: "30px",
                  color: "green",
                  background: "#1890ff26",
                }}
              />
            }
            size="small"
            hoverable={true}
            bordered={false}
            bodyStyle={{
              color: "green",
              textAlign: "center",
              background: "#1890ff26",
            }}
          >
            返回
          </Card>
        }
        onBack={onBack}
        title={<div>做题</div>}
        subTitle={subTitileState}
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>{sectionType}</div>
            {sectionTypeIcon[sectionType]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      <div style={{ border: "1px solid #96cefb5c" }}>
        <Form scrollToFirstError onFinish={confirmSubmit}>
          {ExamQuestions(examState, dispatch, sectionID)}
          <Form.Item>
            <Row align="center">
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const ExamQuestions = (exams, dispatch, sectionID) => {
  if (!exams) {
    return;
  }
  let question = [];

  const selectExcept = (e, examID) => {
    dispatch({
      type: "updateAnswer",
      data: [{ examID, myAnswer: e.target.value, sectionID }],
    });
  };
  const selectMultiple = (ans, examID) => {
    let answer = ans.sort().join("");
    dispatch({
      type: "updateAnswer",
      data: [{ examID, myAnswer: answer, sectionID }],
    });
  };

  exams.forEach((exam, index) => {
    question.push(
      <div style={{ margin: " 0px 20px" }} key={index}>
        <Tag color="#2db7f5">第{index + 1}题</Tag>
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
  };
};

export default connect(mapStateToProps)(ViewExam);
