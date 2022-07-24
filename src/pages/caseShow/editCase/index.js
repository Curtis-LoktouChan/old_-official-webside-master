import { React, useState, useEffect } from "react";
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
import http from "../../../utils/http";

function getCaseById(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "api/v1/caseShow/getCaseById", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function EditCase() {
  const history = useHistory();
  const [uploading, setuploading] = useState(false);
  const [fileList, setfileList] = useState([]);
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const case_id = history.location.search.split("=")[1];

  useEffect(() => {
    getCaseById({ case_id }).then((res) => {
      const { caseTitle, caseContent, caseDiscription } = res.data;
      form.setFieldsValue({
        caseContent: BraftEditor.createEditorState(caseContent),
        caseTitle,
        caseDiscription,
      });
    });
  }, [case_id, form]);

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
    fetch(BASE_URL + "/api/v1/caseShow/updateCase", {
      method: "PUT",
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
    formData.append("case_id", case_id);

    handleUpload(formData);
  };
  return (
    <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
      {" "}
      <PageHeader
        backIcon={<LeftCircleTwoTone style={{ fontSize: "30px" }} />}
        onBack={onBack}
        title={<div>修改案例中...</div>}
      />
      <Form form={form} onFinish={publishCase}>
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
          <Button icon={<UploadOutlined />}>
            请在这里上传要更新文件，不更新则保留之前已上传的文件
          </Button>
        </Upload>
      </Row>
    </div>
  );
}

export default EditCase;
