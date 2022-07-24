import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Radio, PageHeader, message, Select } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import http from "../../../../utils/http";

function CreateClassReq(params, token) {
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/teacher/class", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function BasicInformation() {
  const [isPerOpen, setPerOpen] = useState(null);
  const [selfStudy, setSelfStudyForm] = useState(null);
  const history = useHistory();

  const onFinish = (values) => {
    const token = localStorage.getItem("token");
    const params = {
      name: values.name,
      classBrief: values.classBrief,
      invitePwd: values.invitePwd,
      selfStudySubject: values.selfStudySubject,
    };
    CreateClassReq(params, token)
      .then((res) => {
        history.goBack();
        message.info(res.msg);
        history.push("/userCenter/");
      })
      .catch((error) => {
        message.error(error.response.data.msg);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const radioOnchange = (e) => {
    const invitePwd = (
      <Form.Item
        label="六位邀请码"
        name="invitePwd"
        rules={[{ required: true, message: "请输入六位邀请码", len: 6 }]}
      >
        <Input />
      </Form.Item>
    );
    if (e.target.value === "permissionOpen") {
      setPerOpen(invitePwd);
    }
    if (e.target.value === "permissionClose") {
      setPerOpen(null);
    }
  };

  const selfStudyRadioOnchange = (e) => {
    const selfStudyForm = (
      <Form.Item
        label="选择科目"
        name="selfStudySubject"
        rules={[{ required: true, message: "请选择自适应学习的科目" }]}
      >
        <Select>
          <Select.Option value="小学数学">小学数学</Select.Option>
        </Select>
      </Form.Item>
    );
    if (e.target.value === "selfStudyOpen") {
      setSelfStudyForm(selfStudyForm);
    }
    if (e.target.value === "selfStudyClose") {
      setSelfStudyForm(null);
    }
  };

  return (
    <PageHeader
      backIcon={<LeftCircleTwoTone style={{ fontSize: "20px" }} />}
      onBack={() => {
        history.goBack();
      }}
      title="新建班级"
      subTitle="正在新建班级"
    >
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="班级名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入正确的班级名称",
              type: "string",
              max: 20,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="班级简介"
          name="classBrief"
          rules={[
            {
              required: true,
              message: "请输入正确的简介，不超过30字",
              type: "string",
              max: 30,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否设置邀请码"
          name="permission"
          rules={[{ required: true, message: "选择是否需要邀请码加入班级" }]}
        >
          <Radio.Group onChange={radioOnchange}>
            <Radio value={"permissionOpen"}>设置</Radio>
            <Radio value={"permissionClose"}>不设置</Radio>
          </Radio.Group>
        </Form.Item>
        {isPerOpen}

        <Form.Item
          label="是否开启自适应学习功能"
          name="isSelfStudy"
          rules={[{ required: true, message: "选择是否需要邀请码加入班级" }]}
        >
          <Radio.Group onChange={selfStudyRadioOnchange}>
            <Radio value={"selfStudyOpen"}>开启</Radio>
            <Radio value={"selfStudyClose"}>不开启</Radio>
          </Radio.Group>
        </Form.Item>
        {selfStudy}
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageHeader>
  );
}

function CreateClass() {
  return (
    <div style={{ padding: "10px 10px" }}>
      <BasicInformation />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(CreateClass);
