import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Collapse, Row, Col } from "antd";

import { connect } from "react-redux";
import { EditTwoTone } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../constant/icon";
import http from "../../../../../utils/http";

const { Panel } = Collapse;

function getCourseMenuReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/student/getCourseMenu", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function Section(props) {
  const history = useHistory();

  const onClickLook = () => {
    history.push("/userCenter/student/IntoClass/viewTextSection", {
      sectionType: props.type,
      sectionTitle: props.title,
      sectionID: props.sectionID,
      chapterID: props.chapterID,
    });
  };
  const onClickExam = () => {
    history.push("/userCenter/student/IntoClass/viewExam", {
      sectionType: props.type,
      sectionTitle: props.title,
      sectionID: props.sectionID,
      chapterID: props.chapterID,
    });
  };

  return (
    <div>
      <Row
        align="middle"
        style={{
          height: "50px",
          border: "1px solid #d9d9d9d9",
          marginBottom: "4px",
        }}
      >
        <Col
          style={{
            borderLeft: "5px solid #1890ff70",
            height: "50px",
          }}
          span={2}
        >
          <p
            style={{ lineHeight: "50px", margin: "auto", textAlign: "center" }}
          >
            {props.ID}
          </p>
        </Col>
        <Col span={1}>{sectionTypeIcon[props.type]}</Col>
        <Col span={2}>{props.type}</Col>
        <Col span={15}>
          <strong>标题: &nbsp;</strong>
          {props.title}
        </Col>
        <Col span={3}>
          {props.type === "试题" ? (
            <Button size="100px" onClick={onClickExam} icon={<EditTwoTone />}>
              做题
            </Button>
          ) : (
            <Button size="100px" onClick={onClickLook} icon={<EditTwoTone />}>
              学习
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

function Chapter(props) {
  let dataSource = null;
  if (props.dataSource != null) {
    dataSource = props.dataSource.map((item, key) => {
      return (
        <Section
          key={key}
          ID={key + 1}
          classID={props.classID}
          chapterID={props.chapterID}
          sectionID={item.ID}
          title={item.sectionTitle}
          type={item.sectionType}
        ></Section>
      );
    });
  }

  return (
    <div style={{ margin: "3px 10px 10px 10px" }}>
      <Collapse defaultActiveKey={["1"]} accordion>
        <Panel
          key="1"
          collapsible="header"
          header={
            <h3
              style={{
                color: "#1890ff",
                fontWeight: "900",
                background: "#e3eaef",
              }}
            >
              {props.title}
            </h3>
          }
        >
          <strong>章节概况:&nbsp;</strong>
          {props.discription}
          {dataSource}
        </Panel>
      </Collapse>
    </div>
  );
}

function CourseMenu(props) {
  const [dataSource, SetDataSource] = useState(null);

  useEffect(() => {
    getCourseMenuReq({ classID: props.classID })
      .then((res) => {
        if (res.data != null) {
          const courseMenu = res.data.map((item, key) => {
            return (
              <Chapter
                key={key}
                classID={props.classID}
                chapterID={item.ID}
                title={item.chapterTitle}
                discription={item.chapterDiscription}
                dataSource={item.sections}
              ></Chapter>
            );
          });

          SetDataSource(courseMenu);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.history, props.history.location, props.classID]);

  return <div>{dataSource}</div>;
}
const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(CourseMenu);
