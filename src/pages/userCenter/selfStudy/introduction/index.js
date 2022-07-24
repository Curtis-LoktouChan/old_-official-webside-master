import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Result, Button, Layout, PageHeader, Row, Col } from "antd";
import { FundTwoTone, LeftCircleTwoTone } from "@ant-design/icons";
import NeoGraphApp from "../../../../utils/neo4j/App";
import http from "../../../../utils/http";

function userUnknowReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("post", "/api/v1/selfStudy/userUnknow", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function SelfStudyIntrodcution(props) {
  const { selfStudySubject } = props;
  const history = useHistory();
  const subTitleClassID = "班级ID:" + props.classID + "  ";
  const subTitleInvitePwd = props.invitePwd
    ? `邀请码:${props.invitePwd}`
    : `邀请码:无`;
  const subTitle = subTitleClassID + subTitleInvitePwd;
  console.log(props);
  const onClickUserUnknow = () => {
    userUnknowReq().then((res) => {
      const { knowledge_list } = res.data;
      if (knowledge_list.length !== 0) {
        if (props.roleId === "2") {
          history.push("/userCenter/selfStudy/scoreResult", { knowledge_list });
        } else if (props.roleId === "1") {
          history.push("/userCenter/student/selfStudy/scoreResult", {
            knowledge_list,
          });
        }
      } else {
        if (props.roleId === "2") {
          history.push("/userCenter/selfStudy/doExam");
        } else if (props.roleId === "1") {
          history.push("/userCenter/student/selfStudy/doExam");
        }
      }
    });
  };

  return (
    <Layout>
      <Layout.Content>
        <PageHeader
          style={{ background: "#f4fbff" }}
          backIcon={<LeftCircleTwoTone style={{ fontSize: "20px" }} />}
          onBack={() => {
            history.goBack();
          }}
          title={props.className}
          subTitle={subTitle}
        />
        <Result
          icon={<FundTwoTone />}
          title={
            <div>
              欢迎进入自适应学习系统
              <h2 style={{ color: "green" }}> 科目:{selfStudySubject}</h2>
            </div>
          }
          subTitle="自适应学习系统是通过学生每一阶段的能力测评结果，再制定出适应于用户自身能力状况的学习解决方案，精准定制专属于每一位用户的动态学习计划的一种学习方式。"
          extra={
            <span>
              <Button size="large" type="primary">
                {props.roleId === "2" ? (
                  <Link to="/userCenter/selfStudy/doExam">首次学习</Link>
                ) : (
                  <Link to="/userCenter/student/selfStudy/doExam">
                    首次学习
                  </Link>
                )}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button size="large" onClick={onClickUserUnknow} type="primary">
                针对薄弱点训练
              </Button>
            </span>
          }
        />
        <Row justify="center">
          <Col span={20}>
            <NeoGraphApp />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
    ...state.user,
  };
};

export default connect(mapStateToProps)(SelfStudyIntrodcution);
