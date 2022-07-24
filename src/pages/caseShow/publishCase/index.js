import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Form,
  Col,
  Button,
  Row,
  Input,
  Upload,
  message,
} from "antd";
import BraftEditor from "braft-editor";
import { BASE_URL } from "../../../constant/config";
import { UploadOutlined, LeftCircleTwoTone } from "@ant-design/icons";

function PublishCase() {
  const history = useHistory();
  const [uploading, setuploading] = useState(false);
  const [fileList, setfileList] = useState([]);

  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setfileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file);
      setfileList([file]);
      return false;
    },
    fileList,
  };

  const handleUpload = (formData) => {
    const token = localStorage.getItem("token");
    setuploading(true);
    fetch(BASE_URL + "/api/v1/caseShow/publishCase", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setfileList([]);
          message.success("发布成功");
          history.goBack();
        } else if (res.status === 400) {
          message.error("发布失败:文件格式有误");
        } else {
          message.error("发布失败：服务内部错误");
        }
      })
      .catch(() => {
        message.error("发布失败：服务内部错误");
      })
      .finally(() => {
        setuploading(false);
      });
  };

  const onBack = () => {
    history.goBack();
  };
  const publishCase = (value) => {
    const { caseTitle, caseDiscription } = value;
    const caseContent = editorState.toHTML();

    const formData = new FormData();
    fileList.forEach((file, i) => {
      formData.append("file[]", file);
    });
    formData.append("caseTitle", caseTitle);
    formData.append("caseContent", caseContent);
    formData.append("caseDiscription", caseDiscription);
    handleUpload(formData);
  };
  return (
    <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
      {" "}
      <PageHeader
        backIcon={<LeftCircleTwoTone style={{ fontSize: "30px" }} />}
        onBack={onBack}
        title={<div>编写案例中...</div>}
      />
      <Form
        name="caseForm"
        onFinish={publishCase}
        // onFinishFailed={submitFailed}
      >
        <Row>
          <Col span={20}>
            {" "}
            <Form.Item
              name="caseTitle"
              rules={[{ required: true, message: "案例标题不为空！" }]}
              label="案例标题"
            >
              <Input.TextArea
                size="small"
                maxLength={50}
                showCount
                placeholder="请输入案例标题"
              />
            </Form.Item>
            <Form.Item name="caseDiscription" label="♪ 案例描述">
              <Input.TextArea
                size="large"
                maxLength={200}
                showCount
                placeholder="请简要的描述您的案例吧"
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
                {uploading ? "正在发布..." : "发布"}
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="caseContent">
          <BraftEditor
            value={editorState}
            onChange={handleEditorChange}
            placeholder="请输入正文..."
          />
        </Form.Item>
      </Form>
      <Row>
        <Upload {...props} maxCount={1} accept=".xml">
          <Button icon={<UploadOutlined />}>上传案例文件(最多上传1个)</Button>
        </Upload>
      </Row>
    </div>
  );
}

export default PublishCase;
