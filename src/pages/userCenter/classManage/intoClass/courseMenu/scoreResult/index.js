import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Space, Result } from "antd";

import { LikeTwoTone } from "@ant-design/icons";

import http from "../../../../../../utils/http";

function getScoreBySectionIDReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/getScoreBySectionID", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function ScoreResult(props) {
  const [scoreState, setScoreState] = useState("");
  const { sectionID } = props.location.state;
  const history = useHistory();
  const backCourseMenu = () => {
    history.push("/userCenter/intoClass/courseMenu");
  };

  const viewSolution = () => {
    history.push("/userCenter/intoClass/viewSolution", { sectionID });
  };

  useEffect(() => {
    getScoreBySectionIDReq({ sectionID }).then((res) => {
      setScoreState(
        (res.data.rightCount / res.data.totalCount).toFixed(2) * 100
      );
    });
  }, [sectionID]);

  return (
    <Result
      icon={<LikeTwoTone />}
      title={`提交成功！您的正确率为${scoreState}%`}
      extra={
        <Space>
          <Button onClick={backCourseMenu} type="primary">
            返回课程主页
          </Button>
          <Button danger onClick={viewSolution} type="primary">
            查看解析
          </Button>
        </Space>
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(ScoreResult);
