import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Divider, Tag } from "antd";
import { PageHeader, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { RollbackOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../constant/icon";
import http from "../../../../utils/http";

function getExamSolutionReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/selfStudy/getExamSolution", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function ViewSolution(props) {
  const history = useHistory();
  const [solutionExamState, setSolutionExamState] = useState(null);
  const { classID, examLength } = props;

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getExamSolutionReq({ selfStudyClassID: classID, examLength }).then(
      (res) => {
        console.log(res);
        setSolutionExamState(res.data);
      }
    );
  }, [classID, examLength]);
  return (
    <div style={{ margin: "0px 20px", border: "1px solid #96cefb5c" }}>
      <PageHeader
        title="查看解析"
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
            返回上一级
          </Card>
        }
        onBack={onBack}
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>试卷</div>
            {sectionTypeIcon["试题"]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      <div style={{ margin: " 0px 20px" }}>
        {solutionExamState === null
          ? null
          : solutionExamState.map((solutionExam, key) => {
              return solutionCard(solutionExam, key);
            })}
      </div>
    </div>
  );
}

const solutionCard = (solutionExam, key) => {
  return (
    <div key={key}>
      <Tag color="#2db7f5">第{key + 1}题</Tag>
      <Tag color="blue">{solutionExam.examType}</Tag>
      <BraftEditor
        value={BraftEditor.createEditorState(solutionExam.examDiscrition)}
        contentStyle={{ height: "auto" }}
        controls={[]}
        readOnly
      />
      <div style={{ marginTop: "-40px" }}>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.A === undefined || solutionExam.A === ""
            ? null
            : `A: ${solutionExam.A}`}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.B === undefined || solutionExam.B === ""
            ? null
            : `B: ${solutionExam.B}`}{" "}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.C === undefined || solutionExam.C === ""
            ? null
            : `C: ${solutionExam.C}`}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.D === undefined || solutionExam.D === ""
            ? null
            : `D: ${solutionExam.D}`}{" "}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.E === undefined || solutionExam.E === ""
            ? null
            : `E: ${solutionExam.E}`}{" "}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-1px" }}>
          {solutionExam.F === undefined || solutionExam.F === ""
            ? null
            : `F: ${solutionExam.F}`}
        </p>

        {solutionExam.myAnswer === solutionExam.Answer ? (
          <p
            style={{ fontSize: "18px", color: "green", marginBottom: "-1px" }}
          >{`你的答案：${solutionExam.myAnswer}`}</p>
        ) : (
          <p
            style={{ fontSize: "18px", color: "red", marginBottom: "-1px" }}
          >{`你的答案：${solutionExam.myAnswer}`}</p>
        )}

        <p
          style={{ fontSize: "18px", marginBottom: "-1px" }}
        >{`正确答案：${solutionExam.Answer}`}</p>
        <p
          style={{ fontSize: "18px", marginBottom: "-1px" }}
        >{`答案解析：${solutionExam.examSolution}`}</p>
        <Divider></Divider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(ViewSolution);
