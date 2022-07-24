import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Space, Result, Row, Col, Steps, PageHeader } from "antd";

import { LikeTwoTone, LeftCircleTwoTone } from "@ant-design/icons";

import http from "../../../../utils/http";

const { Step } = Steps;

function getRecommendReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/selfStudy/getRecommendResult", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function Recommend(props) {
  const [scoreState, setScoreState] = useState("");
  const [unknowState, setUnknowState] = useState(null);
  const [currentState, setCurrentState] = useState(0);

  const { classID, examLength } = props;

  const history = useHistory();
  const { isSkipRecommend, knowledge_list } = history.location.state;

  const backCourseMenu = () => {
    history.push("/userCenter");
  };
  const goback = () => {
    history.goBack();
  };

  const onChange = (current) => {
    setCurrentState(current);
  };

  const viewSolution = () => {
    if (props.roleId === "2") {
      history.push("/userCenter/selfStudy/viewSolution");
    } else if (props.roleId === "1") {
      history.push("/userCenter/student/selfStudy/viewSolution");
    }
  };

  useEffect(() => {
    let recommendArr = [];
    if (!isSkipRecommend) {
      getRecommendReq({
        selfStudyClassID: classID,
        examLength: examLength,
      }).then((res) => {
        setScoreState(
          (res.data.rightCount / res.data.totalCount).toFixed(2) * 100
        );
        const { knowledge_list } = res.data.recommendRes;
        let key = 0;
        for (let i in knowledge_list) {
          recommendArr.push(
            <Step
              key={key++}
              title={knowledge_list[i].name}
              description={
                <a
                  href={knowledge_list[i].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {knowledge_list[i].url}
                </a>
              }
            />
          );
        }
        setUnknowState(recommendArr);
      });
    } else {
      let key = 0;
      for (let i in knowledge_list) {
        recommendArr.push(
          <Step
            key={key++}
            title={knowledge_list[i].name}
            description={
              <a
                href={knowledge_list[i].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {knowledge_list[i].url}
              </a>
            }
          />
        );
      }
      setUnknowState(recommendArr);
    }
  }, [classID, examLength, isSkipRecommend, knowledge_list]);

  return (
    <div>
      <PageHeader
        title={props.className}
        style={{ background: "#1890ff26", marginBottom: "30px" }}
        onBack={() => {
          history.push("/userCenter");
        }}
        backIcon={
          <span>
            <LeftCircleTwoTone style={{ fontSize: "20px" }} />
            &nbsp; 返回到班级
          </span>
        }
      />
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col span={18}>
          <Steps current={3} size="large">
            <Step title="能力水平初探" />
            <Step title="查看结果" />
            <Step title="查漏补缺" />
            <Step title="生成推荐" />
          </Steps>
        </Col>
      </Row>

      {!isSkipRecommend ? (
        <Result
          icon={<LikeTwoTone />}
          title={`提交成功！您的正确率为${scoreState}%`}
        />
      ) : null}
      <Row justify="center">
        <p style={{ fontSize: "20px", color: "green" }}>
          推荐的学习路线和资源有：
          <Steps
            onChange={onChange}
            current={currentState}
            style={{ marginTop: "30px" }}
            direction="vertical"
            size="large"
          >
            {unknowState}
          </Steps>
        </p>
      </Row>
      <Row justify="center">
        <Space>
          <Button size="large" onClick={backCourseMenu} type="primary">
            返回个人中心
          </Button>

          {isSkipRecommend ? (
            <Button size="large" onClick={goback} type="primary">
              返回查看结果
            </Button>
          ) : null}
          {isSkipRecommend ? null : (
            <Button size="large" danger onClick={viewSolution} type="primary">
              查看解析
            </Button>
          )}
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

export default connect(mapStateToProps)(Recommend);
