import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { PageHeader, Button, Form, Input, Row, Col, message, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { RollbackOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

const { TextArea } = Input;
function addSectionReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/addSection", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function CreateTextSection(props) {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );

  const history = useHistory();
  const { sectionType } = history.location.state;
  const { chapterID } = history.location.state;
  const { chapterTitle } = history.location.state;

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const onBack = () => {
    history.goBack();
  };
  const submitContent = (values) => {
    const sectionTitle = values.sectionTitle;
    let sectionContent = values.sectionContent;
    if (sectionContent === undefined) {
      sectionContent = "<p></p>";
    } else {
      sectionContent = sectionContent.toHTML();
    }
    const submitData = {
      classID: props.classID,
      chapterID: chapterID,
      sectionTitle,
      sectionContent,
      sectionType,
    };

    addSectionReq(submitData)
      .then((res) => {
        if (res.code === 200) {
          message.info(res.msg);
          history.push("/userCenter/IntoClass/courseMenu");
          console.log(submitData);
        } else {
          message.warning(res.msg);
        }
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
  };

  const submitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ margin: "0px 20px" }}>
      <PageHeader
        className="site-page-header"
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
        title={<div>添加小节</div>}
        subTitle={chapterTitle}
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>{sectionType}</div>
            {sectionTypeIcon[sectionType]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      <Form
        name="sectionForm"
        onFinish={submitContent}
        onFinishFailed={submitFailed}
      >
        <Row>
          <Col span={20}>
            {" "}
            <Form.Item
              name="sectionTitle"
              rules={[{ required: true, message: "小节标题不为空！" }]}
              label="小节标题"
            >
              <TextArea
                size="small"
                placeholder="请输入小节标题"
                showCount
                maxLength={100}
              />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={2}>
            {" "}
            <Form.Item>
              <Button
                style={{ float: "right" }}
                size="large"
                type="primary"
                htmlType="submit"
              >
                提交
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="sectionContent" label="✔ 小节正文">
          <BraftEditor
            value={editorState}
            onChange={handleEditorChange}
            onSave={submitContent}
            style={{ background: "#f5f5f561" }}
            placeholder="请输入正文(可插入文字、图片、视频链接,请跟选择类型进行合理编辑正文)"
          />
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

export default connect(mapStateToProps)(CreateTextSection);
