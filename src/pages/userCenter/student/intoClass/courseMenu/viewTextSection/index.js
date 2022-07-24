import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { PageHeader, Card } from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { RollbackOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

function getSectionReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/student/getSection", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function ViewTextSection(props) {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const [subTitileState, setSubTitileState] = useState(null);

  const history = useHistory();
  const { sectionType } = history.location.state;
  const { sectionID } = history.location.state;
  const { chapterID } = history.location.state;
  const { classID } = props;

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getSectionReq({ classID, sectionID, chapterID }).then((res) => {
      const resContent = res.data.sectionContent;
      const resSubTitle = res.data.sectionTitle;

      const editorText = BraftEditor.createEditorState(resContent);
      setEditorState(editorText);
      setSubTitileState(resSubTitle);
    });
  }, [classID, sectionID, chapterID]);

  return (
    <div style={{ margin: "0px 20px" }}>
      <PageHeader
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
            返回
          </Card>
        }
        onBack={onBack}
        title={<div>正在浏览</div>}
        subTitle={subTitileState}
        extra={
          <div>
            <div style={{ fontWeight: "900" }}>{sectionType}</div>
            {sectionTypeIcon[sectionType]}
          </div>
        }
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />

      <BraftEditor
        value={editorState}
        style={{ background: "#f5f5f561" }}
        controls={[]}
        readOnly={true}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(ViewTextSection);
