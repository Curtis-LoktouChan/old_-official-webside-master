import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Input, Row, Button, Rate, Form, Select, message } from "antd";
import { PageHeader, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { RollbackOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

function getKnowClassifyReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/getKnowClassify", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function getSingleExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/getSingleExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function updateSingleExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("put", "/api/v1/teacher/updateSingleExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function UpdateExamPage(props) {
  const history = useHistory();
  const [examState, SetExamState] = useState(null);
  const [optionsState, setOptionsState] = useState(null);
  const [form] = Form.useForm();
  const { sectionID, classID, examID } = history.location.state;

  const onBack = () => {
    history.goBack();
  };

  const finishUpdate = (exam) => {
    exam.examDiscrition = exam.examDiscrition.toHTML();
    if (exam.examDiscrition === "<p></p>") {
      message.warning("题目不能为空");
      return;
    }
    if (typeof exam.examAnswer == "object") {
      exam.examAnswer = exam.examAnswer.sort().join("");
    }
    //处理知识点分类字符串
    exam["classify"] = "";
    if (exam["knowClassify"] !== undefined) {
      exam["classify"] = exam["knowClassify"].split(".")[1];
    }

    updateSingleExamReq(exam)
      .then((res) => {
        if (res.code === 200) {
          message.info("修改成功!");
          history.goBack();
        }
      })
      .catch((err) => {
        const { code } = err.response.data;
        if (code === 401) {
          message.error("没有权力修改");
        } else {
          message.error("未知错误");
        }
      });
  };

  useEffect(() => {
    getSingleExamReq({ examID, classID, sectionID }).then((res) => {
      const exam = res.data;
      SetExamState(exam);
      form.setFieldsValue({
        examDiscrition: BraftEditor.createEditorState(exam.examDiscrition),
        examDifficulty: exam.examDifficulty,
        examAnswer: exam.examAnswer.split(""),
        examSolution: exam.examSolution,
        knowClassify: exam.classify,
        A: exam.A,
        B: exam.B,
        C: exam.C,
        D: exam.D,
        E: exam.E,
        F: exam.F,
      });
    });
    getKnowClassifyReq({ subject: "小学数学" }).then((res) => {
      const options = [];
      res.data.forEach((value, key) => {
        options.push({
          label: key + 1 + "." + value.knowledge,
          value: key + 1 + "." + value.knowledge,
        });
      });
      setOptionsState(options);
    });
  }, [sectionID, classID, examID, form]);
  return (
    <div style={{ margin: "0px 20px", border: "1px solid #96cefb5c" }}>
      <PageHeader
        title="修改题目"
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
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>试卷</div>
            {sectionTypeIcon["试题"]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      {examState === null
        ? null
        : examCard(examState, form, finishUpdate, optionsState)}
    </div>
  );
}

const examCard = (exam, form, finishUpdate, optionsState) => {
  return (
    <Form
      name="form"
      form={form}
      onFinish={finishUpdate}
      style={{ margin: "0px 30px" }}
    >
      <Form.Item
        label={<strong>{`题目`}</strong>}
        rules={[{ required: true, message: "不能为空" }]}
        name="examDiscrition"
      >
        <BraftEditor
          placeholder="请输入题目(若插图尽可能使用压缩过的小图片)"
          style={{
            border: "1px solid #d9d9d98c",
          }}
          contentStyle={{ height: 100 }}
          controls={["media"]}
          rules={[{ required: true, message: "不能为空" }]}
        />
      </Form.Item>

      {exam.A === undefined || exam.A === "" ? null : (
        <Form.Item name="A" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="A" placeholder="请输入选项" />
        </Form.Item>
      )}
      {exam.B === undefined || exam.B === "" ? null : (
        <Form.Item name="B" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="B" placeholder="请输入选项" />
        </Form.Item>
      )}
      {exam.C === undefined || exam.C === "" ? null : (
        <Form.Item name="C" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="C" placeholder="请输入选项" />
        </Form.Item>
      )}
      {exam.D === undefined || exam.D === "" ? null : (
        <Form.Item name="D" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="D" placeholder="请输入选项" />
        </Form.Item>
      )}
      {exam.E === undefined || exam.E === "" ? null : (
        <Form.Item name="E" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="E" placeholder="请输入选项" />
        </Form.Item>
      )}
      {exam.F === undefined || exam.F === "" ? null : (
        <Form.Item name="F" rules={[{ required: true, message: "不能为空" }]}>
          <Input addonBefore="F" placeholder="请输入选项" />
        </Form.Item>
      )}
      <Form.Item
        name="examAnswer"
        label="答案"
        rules={[{ required: true, message: "不能为空" }]}
      >
        <Select mode={exam.examType === "多选题" ? "multiple" : null}>
          {exam.A === undefined || exam.A === "" ? null : (
            <Select.Option value="A">A</Select.Option>
          )}
          {exam.B === undefined || exam.B === "" ? null : (
            <Select.Option value="B">B</Select.Option>
          )}
          {exam.C === undefined || exam.C === "" ? null : (
            <Select.Option value="C">C</Select.Option>
          )}
          {exam.D === undefined || exam.D === "" ? null : (
            <Select.Option value="D">D</Select.Option>
          )}
          {exam.E === undefined || exam.E === "" ? null : (
            <Select.Option value="E">E</Select.Option>
          )}
          {exam.F === undefined || exam.F === "" ? null : (
            <Select.Option value="F">F</Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item label="答案解析(可选)" name="examSolution">
        <Input.TextArea size="small" showCount maxLength={300} />
      </Form.Item>

      <Form.Item
        label="知识点分类"
        name="knowClassify"
        //   rules={[{ required: true, message: "不能为空" }]}
      >
        <Select showArrow showSearch options={optionsState}></Select>
      </Form.Item>
      <Form.Item
        label="难度"
        name="examDifficulty"
        rules={[{ required: true, message: "不能为空" }]}
      >
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="ID">{form.setFieldsValue({ ID: exam.ID })}</Form.Item>
      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            完成修改
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(UpdateExamPage);
