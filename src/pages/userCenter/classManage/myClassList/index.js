import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Row, Col, Popconfirm, message, Space, Tag } from "antd";
import { actions } from "../../../../constant/index";
import http from "../../../../utils/http";

import cover from "./cover.png";

const { Meta } = Card;

function getClassListReq() {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/class", {}, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteClassReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("delete", "/api/v1/teacher/class", params, token).then(
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
      history.push("/userCenter/IntoClass");
    } else {
      history.push("/userCenter/selfStudy/introdution");
    }
  };
  const onDeletesClick = (classID) => {
    deleteClassReq({ classID }).then((res) => {
      message.info(res.msg);
      history.push("/userCenter/myClassList", { update: "true" });
    });
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
            <Space
              onClick={() => {
                message.info("功能未开放");
              }}
            >
              <SettingOutlined key="setting" />
              设置
            </Space>,
            <Space onClick={onCardCick}>
              <EyeOutlined key="edit" />
              进入班级
            </Space>,
            <Popconfirm
              title="确定删除该班级吗?"
              onConfirm={() => onDeletesClick(item.ID)}
            >
              <DeleteOutlined key="ellipsis" />
              删除班级
            </Popconfirm>,
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

  const onCreateClassClick = () => {
    history.push("/userCenter/createClass");
  };

  useEffect(() => {
    getClassListReq()
      .then((res) => {
        const mapClassList = res.data.classList.map((item, key) => {
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
          <Card
            hoverable
            size="small"
            cover={<img alt="example" src={cover} />}
            onClick={onCreateClassClick}
          >
            <Link to="/userCenter/createClass">
              <h1 style={{ textAlign: "center", color: "#1890ff" }}>
                点击新建班级 <PlusOutlined />
              </h1>
            </Link>
          </Card>
        </Col>

        {classList}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(MyClassList);
