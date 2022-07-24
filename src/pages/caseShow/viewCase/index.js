import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Row, Button, message, Col } from "antd";
import BraftEditor from "braft-editor";
import http from "../../../utils/http";
import { downloadFiles } from "../../../constant/func";
import { LeftCircleTwoTone, FullscreenOutlined } from "@ant-design/icons";

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

function downloadCaseFile(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "api/v1/caseShow/downloadCaseFile", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function ViewCase() {
  const history = useHistory();
  const [caseObj, setCaseObj] = useState(null);
  const case_id = history.location.search.split("=")[1];

  const fullScreen = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(caseObj.caseContent);
    window.previewWindow.document.close();
  };

  useEffect(() => {
    getCaseById({ case_id }).then((res) => {
      console.log(res);
      setCaseObj(res.data);
    });
  }, [case_id]);

  const onBack = () => {
    history.goBack();
  };

  const download = (url, fileName) => {
    downloadCaseFile({ url })
      .then((res) => {
        downloadFiles(res, fileName);
      })
      .catch(() => {
        message.error("下载失败");
      });
  };

  return (
    <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
      {" "}
      <PageHeader
        backIcon={<LeftCircleTwoTone style={{ fontSize: "30px" }} />}
        onBack={onBack}
        title={
          caseObj === null ? null : (
            <Row>
              <Col style={{ color: "green" }}>【案例】</Col>
              {caseObj.caseTitle}
              <Col style={{ color: "#fb7299", fontSize: "15px" }}>
                【作者】{caseObj === null ? null : caseObj.author}
              </Col>
            </Row>
          )
        }
      />
      <BraftEditor
        value={
          caseObj === null
            ? null
            : BraftEditor.createEditorState(caseObj.caseContent)
        }
        controls={[]}
        readOnly={true}
        style={{ background: "#59a5e926" }}
      />
      <Row justify="end">
        <Button type="ghost" onClick={fullScreen} style={{ color: "green" }}>
          <FullscreenOutlined />
          全屏
        </Button>
      </Row>
      <Row>
        <p style={{ fontSize: "20px", color: "green" }}>附件下载:</p>
      </Row>
      <div style={{ marginTop: "-20px" }}>
        {caseObj === null ? null : (
          <Button
            type="link"
            onClick={() => {
              download(caseObj.url, caseObj.fileName);
            }}
          >
            {caseObj.fileName}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ViewCase;
