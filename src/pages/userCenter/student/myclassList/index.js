import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Tag,
  Card,
  Avatar,
  Row,
  Col,
  Space,
  Form,
  Input,
  message,
  Modal,
} from "antd";
import { actions } from "../../../../constant/index";
import http from "../../../../utils/http";
import cover from "./cover.png";

const { Meta } = Card;

function getClassListReq() {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/student/class", {}, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function joinClassReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/student/class", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

const classListCard = (item, key, history, props) => {
  const onCardCick = () => {
    props.dispatch({
      type: actions.SAVE_CLASSINFO,
      classID: item.ID,
      className: item.name,
      classBrief: item.classBrief,
      invitePwd: item.invitePwd,
      selfStudySubject: item.selfStudySubject,
    });
    if (item.selfStudySubject === "") {
      history.push("/userCenter/student/IntoClass");
    } else {
      history.push("/userCenter/student/selfStudy/introdution");
    }
  };

  return (
    <Col key={key} span={6}>
      <div>
        <Card
          hoverable
          size="small"
          cover={
            <img
              onClick={onCardCick}
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <Space onClick={onCardCick}>
              <EyeOutlined key="edit" />
              进入班级
            </Space>,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                style={{ backgroundColor: "#1296db", verticalAlign: "middle" }}
                size="large"
              >
                {props.username}
              </Avatar>
            }
            title={
              <span>
                {item.name}
                {item.selfStudySubject !== "" ? (
                  <Tag style={{ float: "right" }} color="blue">
                    自适应学习
                  </Tag>
                ) : null}
              </span>
            }
            description={item.classBrief}
          />
        </Card>
      </div>
      <br></br>
    </Col>
  );
};

function MyClassList(props) {
  const history = useHistory();
  const [classList, setClassList] = useState([]);
  const [joinClassForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    const classID = joinClassForm.getFieldValue("classID");
    const invitePwd = joinClassForm.getFieldValue("invitePwd");
    joinClassReq({ classID: parseInt(classID), invitePwd })
      .then((res) => {
        message.info(res.msg);
        history.push("userCenter");
      })
      .catch((err) => {
        message.warn(err.response.data.msg);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const joinClassModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    getClassListReq()
      .then((res) => {
        const mapClassList = res.data.allClassList.map((item, key) => {
          return classListCard(item, key, history, props);
        });

        setClassList(mapClassList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history, props, history.location.state]);

  return (
    <div style={{ padding: "0px 10px" }}>
      <Row gutter={16}>
        <Col span={6}>
          {" "}
          <Card
            hoverable
            size="small"
            cover={<img alt="example" src={cover} />}
            onClick={joinClassModal}
          >
            <h1 style={{ textAlign: "center", color: "#1890ff" }}>
              加入班级 <PlusOutlined />
            </h1>
          </Card>
        </Col>{" "}
        {classList}
      </Row>
      <Modal
        title="请输入班级ID和邀请码（如不需要邀请码可以不输入）"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          form={joinClassForm}
          autoComplete="off"
        >
          <Form.Item
            label="班级ID"
            name="classID"
            rules={[{ required: true, message: "班级ID不能为空！" }]}
          >
            <Input size="large" maxLength={12} />
          </Form.Item>
          <Form.Item label="邀请码" name="invitePwd">
            <Input size="large" maxLength={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(MyClassList);
