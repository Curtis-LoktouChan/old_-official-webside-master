import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import http from "../../../../../../utils/http";
import {
  Form,
  Input,
  Button,
  Card,
  PageHeader,
  Row,
  Select,
  message,
} from "antd";
const { Option } = Select;

function selectExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/selectExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function postSelectedExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/postSelectedExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function SelectExam(props) {
  const history = useHistory();
  const [ExamList, SetExamList] = useState(null);
  const [SelectedExam, SetSelectedExam] = useState(null);
  const { chapterID, classID } = history.location.state;
  const handleChange = (value) => {
    SetSelectedExam(value);
  };

  const onBack = () => {
    history.goBack();
  };
  const finishSelect = (value) => {
    console.log(SelectedExam, value, classID, chapterID);
    postSelectedExamReq({
      classID,
      chapterID,
      sectionTitle: value.examTitle,
      sectionType: "试题",
      SelectedExam,
    }).then((res) => {
      message.info("导入试题成功");
      history.push("/userCenter/intoClass/courseMenu");
    });
  };
  useEffect(() => {
    selectExamReq().then((res) => {
      const selectExams = res.data;
      let selectExamComponent = [];
      selectExams.forEach((exam) => {
        selectExamComponent.push(
          <Option key={exam.ID} value={exam.ID}>
            {exam.ID +
              "[" +
              exam.examType +
              "]" +
              exam.examDiscrition.substring(3, exam.examDiscrition.length - 4)}
          </Option>
        );
      });
      SetExamList(selectExamComponent);
    });
  }, []);
  return (
    <div style={{ margin: "5px 20px" }}>
      <PageHeader
        backIcon={
          <Card
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
        title={<div>新建试题</div>}
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      <Form
        name="dynamic_form_nest_item"
        onFinish={finishSelect}
        autoComplete="off"
      >
        <Form.Item
          name="examTitle"
          label="试题标题"
          rules={[{ required: true, message: "不能为空" }]}
        >
          <Input maxLength={30} placeholder="请填写考试名称" />
        </Form.Item>
        <Select
          mode="multiple"
          placeholder="请选择题目"
          onChange={handleChange}
          style={{ width: "100%", height: "auto" }}
        >
          {ExamList}
        </Select>
        <br></br>
        <br></br>
        <Form.Item>
          <Row justify="center">
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(SelectExam);
