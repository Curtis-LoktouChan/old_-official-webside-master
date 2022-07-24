import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Space, Result, Row, Col, Steps, PageHeader } from "antd";

import { LikeTwoTone, LeftCircleTwoTone } from "@ant-design/icons";

import http from "../../../../utils/http";

const { Step } = Steps;

function getScoreBySectionIDReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/selfStudy/getScoreResult", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function getExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/selfStudy/getExamByKnowledge", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function KnowTag(props) {
  const { knowPoint, roleId } = props;
  const history = useHistory();
  const onClickknow = (knowledge) => {
    getExamReq({ knowledge }).then((res) => {
      if (res.data["knowledge_list"]) {
        const { knowledge_list } = res.data;
        if (roleId === "2") {
          history.push("/userCenter/selfStudy/recommend", {
            isSkipRecommend: true,
            knowledge_list: knowledge_list,
          });
        } else if (roleId === "1") {
          history.push("/userCenter/student/selfStudy/recommend", {
            isSkipRecommend: true,
            knowledge_list: knowledge_list,
          });
        }
      } else {
        if (roleId === "2") {
          history.push("/userCenter/selfStudy/doExamAgain", { knowledge });
        } else if (roleId === "1") {
          history.push("/userCenter/student/selfStudy/doExamAgain", {
            knowledge,
          });
        }
      }
    });
  };

  return (
    <Col span={4} offset={2}>
      <Button
        onClick={() => {
          onClickknow(knowPoint);
        }}
        size="large"
        danger
      >
        {knowPoint}
      </Button>
    </Col>
  );
}

function ScoreResult(props) {
  const [scoreState, setScoreState] = useState("");
  const [unknowState, setUnknowState] = useState(null);

  const { classID, examLength } = props;
  const history = useHistory();

  const { knowledge_list } = history.location.state;

  const backCourseMenu = () => {
    history.push("/userCenter/");
  };

  const viewSolution = () => {
    if (props.roleId === "2") {
      history.push("/userCenter/selfStudy/viewSolution");
    } else if (props.roleId === "1") {
      history.push("/userCenter/student/selfStudy/viewSolution");
    }
  };

  useEffect(() => {
    let unknowArr = [];

    if (knowledge_list.length === 0) {
      getScoreBySectionIDReq({
        selfStudyClassID: classID,
        examLength: examLength,
      }).then((res) => {
        setScoreState(
          (res.data.rightCount / res.data.totalCount).toFixed(2) * 100
        );
        const { unfamiliarKnow } = res.data;

        let key = 0;
        for (let knowPoint in unfamiliarKnow) {
          unknowArr.push(
            <KnowTag roleId={props.roleId} key={key++} knowPoint={knowPoint} />
          );
        }
        setUnknowState(unknowArr);
      });
    } else {
      knowledge_list.forEach((knowPoint, key) => {
        unknowArr.push(
          <KnowTag
            roleId={props.roleId}
            key={key++}
            knowPoint={knowPoint.name}
          />
        );
      });

      setUnknowState(unknowArr);
    }
  }, [classID, examLength, knowledge_list, props.roleId]);

  return (
    <div>
      <PageHeader
        style={{ background: "#f4fbff", marginBottom: "30px" }}
        backIcon={<LeftCircleTwoTone style={{ fontSize: "20px" }} />}
        onBack={() => {
          history.goBack();
        }}
        title={props.className}
      />
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col span={18}>
          <Steps current={1} size="large">
            <Step title="能力水平初探" />
            <Step title="查看结果" />
            <Step title="查漏补缺" />
            <Step title="生成推荐" />
          </Steps>
        </Col>
      </Row>
      {knowledge_list.length === 0 ? (
        <Result
          icon={<LikeTwoTone />}
          title={`提交成功！您的正确率为${scoreState}%`}
        />
      ) : null}

      <Row justify="center">
        <p style={{ fontSize: "20px", color: "green" }}>
          经过测试，您比较薄弱的知识点如下,点击标签就可以进行针对训练啦：
        </p>
      </Row>
      <Row gutter={[0, 20]} style={{ marginBottom: "30px" }}>
        {unknowState}
      </Row>
      <Row justify="center">
        <Space>
          <Button size="large" onClick={backCourseMenu} type="primary">
            返回个人中心
          </Button>
          {knowledge_list.length === 0 ? (
            <Button size="large" danger onClick={viewSolution} type="primary">
              查看解析
            </Button>
          ) : null}
        </Space>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
    ...state.user,
  };
};

export default connect(mapStateToProps)(ScoreResult);
