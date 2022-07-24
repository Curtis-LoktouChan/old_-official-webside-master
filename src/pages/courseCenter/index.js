import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  List,
  Avatar,
  Row,
  PageHeader,
  Button,
  Input,
  message,
  Col,
  Layout,
  Modal,
  Form,
} from "antd";
import Header from "../components/header";
import Footer from "../components/footer";

import http from "../../utils/http";

function GetCourseListBySearch(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/courseCenter/getCourseList", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function joinClass(params) {
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

function CourseCenter(props) {
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [classID, setClassID] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const [joinClassForm] = Form.useForm();
  const { status } = props;
  const pageSize = 10;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    GetCourseListBySearch({ pageNum, pageSize, searchText }).then((res) => {
      console.log(res);
      const { total } = res.data;
      const { courseList } = res.data;
      setTotal(total);
      setDataSource(courseList);
    });
  }, [searchText, pageNum]);

  const showModal = (classID) => {
    setClassID(classID);
    if (status) {
      setIsModalVisible(true);
    } else {
      history.push("/waitToLogin");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const invitePwd = joinClassForm.getFieldValue("invitePwd");
    joinClass({ classID, invitePwd })
      .then((res) => {
        message.info(res.msg);
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <Layout className="homeContainer">
      <Layout.Content>
        <Header />
      </Layout.Content>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <PageHeader
            style={{ marginTop: "-20px", background: "#a3d6ff24" }}
            title="课程中心"
            subTitle="选择感兴趣的课程学习吧！"
            extra={
              <Col>
                <Input.Search
                  onSearch={onSearch}
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="人工智能"
                />
              </Col>
            }
          />
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                setPageNum(page);
              },
              pageSize: pageSize,
              total: total,
            }}
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={200}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/jeane" />}
                  title={<h1 style={{ color: "green" }}>{item.name}</h1>}
                  description={
                    "教师:  " +
                    item.username +
                    " , " +
                    "创建时间:" +
                    item.created_at
                  }
                />
                {"简介:  " + item.classBrief}

                <Row justify="end">
                  <Button
                    onClick={() => {
                      showModal(item.id);
                    }}
                    type="defalut"
                  >
                    加入班级
                  </Button>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Modal
        title="请输入班级邀请码(如无邀请码则不输入)"
        visible={isModalVisible}
        onOk={() => {
          handleOk();
        }}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          form={joinClassForm}
          autoComplete="off"
        >
          <Form.Item label="邀请码" name="invitePwd">
            <Input size="large" maxLength={6} />
          </Form.Item>
        </Form>
      </Modal>
      <br></br>

      <Layout.Footer justify="space-around" align="middle">
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(CourseCenter);
