import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  Divider,
  Row,
  Col,
  Select,
  message,
  Rate,
} from "antd";
import { PageHeader, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import {
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

const { Option } = Select;

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

function addExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/addExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function ExamCard(props) {
  const [form] = Form.useForm();
  const [examState, setExamState] = useState(null);
  const [optionsState, setOptionsState] = useState(null);
  const { classID, chapterID } = props;
  const history = useHistory();
  const onFinish = (section) => {
    const { exams } = section;
    if (exams === undefined || exams.length === 0) {
      message.warning("试题内容不能为空");
      return;
    }
    exams.map((exam) => {
      exam["examDiscrition"] = exam["examDiscrition"].toHTML();
      if (typeof exam["examAnswer"] === "object") {
        exam["examAnswer"] = exam["examAnswer"].sort().join("");
      }
      exam["classify"] = "";
      if (exam["knowClassify"] !== undefined) {
        exam["classify"] = exam["knowClassify"].split(".")[1];
      }

      exam["options"].map((opt) => {
        exam[Object.keys(opt)] = Object.values(opt)[0];
        return null;
      });

      delete exam["options"];
      delete exam["knowClassify"];
      return null;
    });

    addExamReq({
      classID,
      chapterID,
      sectionTitle: section.examTitle,
      sectionType: "试题",
      exams,
    }).then((res) => {
      message.info(res.msg);
      history.push("/userCenter/IntoClass/courseMenu");
    });
  };

  useEffect(() => {
    getKnowClassifyReq({ subject: "小学数学" }).then((res) => {
      const options = [];
      res.data.forEach((value, key) => {
        options.push({
          label: value.ID + "." + value.knowledge,
          value: value.ID + "." + value.knowledge,
        });
      });
      setOptionsState(options);
    });
  }, []);

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="examTitle"
        label="试题标题"
        rules={[{ required: true, message: "不能为空" }]}
      >
        <Input placeholder="请填写考试名称" />
      </Form.Item>
      <Divider plain>试题内容</Divider>
      <Form.List name="exams">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div>
                <Row justify="space-around" align="middle">
                  <Col span={23}>
                    <Form.Item
                      {...field}
                      label={<strong>{`题目${field.name + 1}`}</strong>}
                      name={[field.name, "examDiscrition"]}
                      fieldKey={[field.fieldKey, "examDiscrition"]}
                      rules={[{ required: true, message: "不能为空" }]}
                      style={{ width: "99%" }}
                    >
                      <BraftEditor
                        placeholder="请输入题目(若插图尽可能使用压缩过的小图片)"
                        style={{
                          border: "1px solid #d9d9d98c",
                        }}
                        contentStyle={{ height: 100 }}
                        controls={["media"]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
                <Form.Item
                  name={[field.name, "examType"]}
                  fieldKey={[field.fieldKey, "examType"]}
                  rules={[{ required: true, message: "不能为空" }]}
                >
                  <Radio.Group
                    onChange={() => {
                      setExamState(form.getFieldValue("exams"));
                    }}
                  >
                    <Radio value="单选题">单选题</Radio>
                    <Radio value="多选题">多选题</Radio>
                    <Radio value="判断题">判断题</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.List
                  {...field}
                  name={[field.name, "options"]}
                  fieldKey={[field.fieldKey, "options"]}
                >
                  {(options, { add: addOption, remove: removeOption }) => (
                    <>
                      {options.map((option) => (
                        <div>
                          <Row>
                            <Col span={23}>
                              <Form.Item
                                {...option}
                                name={[
                                  option.name,
                                  String.fromCharCode(
                                    parseInt(option.name) + 65
                                  ),
                                ]}
                                fieldKey={[
                                  option.fieldKey,
                                  String.fromCharCode(
                                    parseInt(option.name) + 65
                                  ),
                                ]}
                                rules={[
                                  { required: true, message: "不能为空" },
                                ]}
                              >
                                <Input
                                  addonBefore={String.fromCharCode(
                                    parseInt(option.name) + 65
                                  )}
                                  placeholder="请输入选项"
                                  style={{ width: "95%" }}
                                />
                              </Form.Item>
                            </Col>
                            <MinusCircleOutlined
                              onClick={() => {
                                removeOption(option.name);
                                setExamState(form.getFieldValue("exams"));
                                console.log(
                                  form.getFieldValue("exams")[field.name]
                                );
                              }}
                            />
                          </Row>
                        </div>
                      ))}
                      <Row>
                        <Col span={24}>
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => {
                                addOption();
                                setExamState(form.getFieldValue("exams"));
                              }}
                              block
                              icon={<PlusOutlined />}
                            >
                              添加选项(选项不超过5个)
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}
                </Form.List>

                <Form.Item
                  label="答案"
                  name={[field.name, "examAnswer"]}
                  fieldKey={[field.fieldKey, "examAnswer"]}
                  rules={[{ required: true, message: "不能为空" }]}
                >
                  <Select
                    mode={
                      examState === null || examState[field.name] === undefined
                        ? null
                        : examState[field.name].examType === "多选题"
                        ? "multiple"
                        : null
                    }
                  >
                    {examState === null ||
                    examState[field.name] === undefined ||
                    examState[field.name].options === undefined
                      ? null
                      : examState[field.name].options.map((_, key) => {
                          return (
                            <Option value={String.fromCharCode(key + 65)}>
                              {String.fromCharCode(key + 65)}
                            </Option>
                          );
                        })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="答案解析(可选)"
                  name={[field.name, "examSolution"]}
                  fieldKey={[field.fieldKey, "examSolution"]}
                >
                  <Input.TextArea
                    size="small"
                    placeholder="请输入答案解析"
                    showCount
                    maxLength={300}
                  />
                </Form.Item>

                <Form.Item
                  label="知识点分类"
                  name={[field.name, "knowClassify"]}
                  fieldKey={[field.fieldKey, "knowClassify"]}
                  //   rules={[{ required: true, message: "不能为空" }]}
                >
                  <Select showArrow showSearch options={optionsState}></Select>
                </Form.Item>

                <Form.Item
                  label="难度"
                  name={[field.name, "examDifficulty"]}
                  fieldKey={[field.fieldKey, "examDifficulty"]}
                  rules={[{ required: true, message: "不能为空" }]}
                >
                  <Rate allowHalf defaultValue={0} />
                </Form.Item>
                <Divider plain></Divider>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                添加题目
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            完成
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

function EditExam(props) {
  const history = useHistory();
  const { sectionType } = history.location.state;

  const { chapterID } = history.location.state;
  const { classID } = props;

  const onBack = () => {
    history.goBack();
  };
  const gotoSelectExam = () => {
    history.push("/userCenter/intoClass/selectExam", { chapterID, classID });
  };

  return (
    <div style={{ margin: "0px 20px" }}>
      <PageHeader
        backIcon={
          <Card
            cover={
              <RollbackOutlined
                style={{
                  fontSize: "20px",
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
        title={<div>新建试题</div>}
        subTitle={
          <Button type="primary" onClick={gotoSelectExam}>
            从题库导入
          </Button>
        }
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>{sectionType}</div>
            {sectionTypeIcon[sectionType]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />

      <Row style={{ border: "1px solid #96cefb5c" }} justify="center">
        <Col span={3}></Col>
        <Col span={18}>
          <ExamCard chapterID={chapterID} classID={classID} />
        </Col>
        <Col span={3}></Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(EditExam);
