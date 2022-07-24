import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Collapse,
  Row,
  Col,
  Modal,
  Input,
  Form,
  message,
  Card,
  Popconfirm,
} from "antd";

import { connect } from "react-redux";
import {
  EyeTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  FileAddTwoTone,
} from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../constant/icon";
import http from "../../../../../utils/http";

const TextIcon = sectionTypeIcon["文本"];
const VideoIcon = sectionTypeIcon["视频"];
const ExamIcon = sectionTypeIcon["试题"];

const { Panel } = Collapse;
const { TextArea } = Input;

function getCourseMenuReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/getCourseMenu", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function updateChapterReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("put", "/api/v1/teacher/updateChapter", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteChapterReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/deleteChapter", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteSectionReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/deleteSection", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function Section(props) {
  const history = useHistory();
  const onClickEdit = () => {
    let path = "/userCenter/IntoClass/editTextSection";

    history.push(path, {
      sectionType: props.type,
      sectionTitle: props.title,
      sectionID: props.sectionID,
      chapterID: props.chapterID,
    });
  };
  const onClickLook = () => {
    let path = "/userCenter/IntoClass/";
    if (props.type === "试题") {
      path += "viewExam";
    } else {
      path += "viewTextSection";
    }
    history.push(path, {
      sectionType: props.type,
      sectionTitle: props.title,
      sectionID: props.sectionID,
      chapterID: props.chapterID,
    });
  };
  const onClickDelete = () => {
    deleteSectionReq({
      classID: props.classID,
      chapterID: props.chapterID,
      sectionID: props.sectionID,
    })
      .then((res) => {
        message.info(res.msg);
        history.push("/userCenter/IntoClass/courseMenu");
      })
      .catch((err) => {
        message.error(err.response.data.msg);
      });
  };
  const updateExam = () => {
    history.push("/userCenter/intoClass/updateExamList", {
      sectionID: props.sectionID,
      classID: props.classID,
    });
  };

  return (
    <div>
      <Row
        align="middle"
        style={{
          height: "50px",
          border: "1px solid #d9d9d9d9",
          marginBottom: "4px",
        }}
      >
        <Col
          style={{
            borderLeft: "5px solid #1890ff70",
            height: "50px",
          }}
          span={2}
        >
          <p
            style={{ lineHeight: "50px", margin: "auto", textAlign: "center" }}
          >
            {props.ID}
          </p>
        </Col>
        <Col span={1}>{sectionTypeIcon[props.type]}</Col>
        <Col span={2}>{props.type}</Col>
        <Col span={10}>
          <strong>标题: &nbsp;</strong>
          {props.title}
        </Col>
        <Col span={3}>
          <Button size="100px" onClick={onClickLook} icon={<EyeTwoTone />}>
            浏览
          </Button>
        </Col>
        <Col span={3}>
          {props.type === "试题" ? (
            <Button size="100px" onClick={updateExam} icon={<EditTwoTone />}>
              修改
            </Button>
          ) : (
            <Button size="100px" onClick={onClickEdit} icon={<EditTwoTone />}>
              编辑
            </Button>
          )}
        </Col>

        <Col span={3}>
          <Popconfirm
            title="确定删除吗(不可恢复)？"
            okText="是"
            cancelText="否"
            onConfirm={onClickDelete}
          >
            <Button size="100px" icon={<DeleteTwoTone />}>
              删除
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}

function Chapter(props) {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false);
  const [chapterForm] = Form.useForm();
  const onClickEdit = () => {
    setIsModalVisible(true);
    chapterForm.setFieldsValue({
      chapterTitle: props.title,
      chapterDiscrption: props.discription,
    });
  };
  const handleOk = () => {
    const chapterTitle = chapterForm.getFieldValue("chapterTitle");
    if (chapterTitle === "") {
      message.warning("章节不能为空");
      return;
    }
    setIsModalVisible(false);
    updateChapterReq({
      classID: props.classID,
      chapterID: props.chapterID,
      chapterTitle: chapterForm.getFieldValue("chapterTitle"),
      chapterDiscription: chapterForm.getFieldValue("chapterDiscrption"),
    })
      .then((res) => {
        message.info(res.msg);

        history.push("/userCenter/IntoClass/courseMenu");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClickAdd = () => {
    setIsAddSectionVisible(true);
  };
  const handleAddSectionCancle = () => {
    setIsAddSectionVisible(false);
  };

  const onClickDeleteChapter = () => {
    deleteChapterReq({
      classID: props.classID,
      chapterID: props.chapterID,
    })
      .then((res) => {
        message.info(res.msg);
        history.push("/userCenter/IntoClass/courseMenu");
      })
      .catch((err) => {
        message.error(err.response.data.msg);
      });
  };

  const onClickText = () => {
    setIsAddSectionVisible(false);
    console.log(props);
    history.push("/userCenter/IntoClass/createTextSection", {
      chapterID: props.chapterID,
      chapterTitle: props.title,
      sectionType: "文本",
    });
  };
  const onClickVideo = () => {
    setIsAddSectionVisible(false);

    history.push("/userCenter/IntoClass/createTextSection", {
      chapterID: props.chapterID,
      chapterTitle: props.title,
      sectionType: "视频",
    });
  };
  const onClickExam = () => {
    history.push("/userCenter/intoClass/editExam", {
      chapterID: props.chapterID,
      chapterTitle: props.title,
      sectionType: "试题",
    });
  };

  let dataSource = null;
  if (props.dataSource != null) {
    dataSource = props.dataSource.map((item, key) => {
      return (
        <Section
          key={key}
          ID={key + 1}
          classID={props.classID}
          chapterID={props.chapterID}
          sectionID={item.ID}
          title={item.sectionTitle}
          type={item.sectionType}
        ></Section>
      );
    });
  }

  return (
    <div style={{ margin: "3px 10px 10px 10px" }}>
      <Collapse defaultActiveKey={["1"]} accordion>
        <Panel
          key="1"
          collapsible="header"
          header={
            <h3
              style={{
                color: "#1890ff",
                fontWeight: "900",
                background: "#e3eaef",
              }}
            >
              {props.title}
            </h3>
          }
          extra={
            <div>
              <Button
                size="middle"
                onClick={onClickAdd}
                icon={<FileAddTwoTone />}
              >
                添加小节
              </Button>
              &nbsp;&nbsp;
              <Button
                size="middle"
                onClick={onClickEdit}
                icon={<EditTwoTone />}
              >
                编辑章节
              </Button>
              &nbsp;&nbsp;
              <Popconfirm
                title="删除章节下的全部内容？"
                okText="是"
                cancelText="否"
                onConfirm={onClickDeleteChapter}
              >
                <Button size="middle" icon={<DeleteTwoTone />}>
                  删除章节
                </Button>
              </Popconfirm>
            </div>
          }
        >
          <strong>章节概况:&nbsp;</strong>
          {props.discription}
          {dataSource}
        </Panel>
      </Collapse>
      <Modal
        title="编辑章节"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={chapterForm}
          layout="vertical"
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
      <Modal
        okText=" "
        okType="text"
        title="添加小节"
        visible={isAddSectionVisible}
        onCancel={handleAddSectionCancle}
      >
        <p style={{ marginBottom: "20px", fontWeight: "900" }}>添加课程内容</p>

        <Row justify="space-between">
          <Col span={6}>
            <Card
              cover={TextIcon}
              size="small"
              hoverable={true}
              bodyStyle={{ textAlign: "center" }}
              bordered={false}
              onClick={onClickText}
            >
              文本
            </Card>
          </Col>
          <Col span={6}>
            <Card
              cover={VideoIcon}
              size="small"
              hoverable={true}
              bordered={false}
              bodyStyle={{ textAlign: "center" }}
              onClick={onClickVideo}
            >
              视频
            </Card>
          </Col>
          <Col span={6}>
            <Card
              cover={ExamIcon}
              size="small"
              hoverable={true}
              bordered={false}
              bodyStyle={{ textAlign: "center" }}
              onClick={onClickExam}
            >
              试题
            </Card>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

function CourseMenu(props) {
  const [dataSource, SetDataSource] = useState(null);

  useEffect(() => {
    getCourseMenuReq({ classID: props.classID })
      .then((res) => {
        if (res.data != null) {
          const courseMenu = res.data.map((item, key) => {
            return (
              <Chapter
                key={key}
                classID={props.classID}
                chapterID={item.ID}
                title={item.chapterTitle}
                discription={item.chapterDiscription}
                dataSource={item.sections}
              ></Chapter>
            );
          });

          SetDataSource(courseMenu);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.history, props.history.location, props.classID]);

  return <div>{dataSource}</div>;
}
const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(CourseMenu);
