import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  List,
  Avatar,
  Row,
  PageHeader,
  Button,
  Pagination,
  Input,
  message,
  Col,
  Popconfirm,
} from "antd";

import { UserOutlined } from "@ant-design/icons";
import http from "../../../utils/http";

function GetCaseListBySearch(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/caseShow/getCaseListBySearch", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function GetMyCase(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/caseShow/getMyCase", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function DeleteMyCase(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("delete", "/api/v1/caseShow/deleteMyCase", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function CaseShowIndex(props) {
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [caseList, setCaseList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isMyCase, SetisMyCase] = useState(false);
  const history = useHistory();
  const { status } = props;
  const pageSize = 10;
  useEffect(() => {
    if (isMyCase) {
      GetMyCase({ pageNum, pageSize, searchText, isMyCase })
        .then((res) => {
          setCaseList(res.data.caseList);
          setTotal(res.data.total);
        })
        .catch(() => {
          message.warning("error");
        });
    } else {
      GetCaseListBySearch({ pageNum, pageSize, searchText })
        .then((res) => {
          setCaseList(res.data.caseList);
          setTotal(res.data.total);
        })
        .catch(() => {
          message.warning("error");
        });
    }
  }, [pageNum, searchText, isMyCase, total]);

  const onClickViewCase = (case_id) => {
    history.push("/caseShow/viewCase?case_id=" + case_id);
  };

  const pageOnChange = (page) => {
    setPageNum(page);
  };

  const publishCase = () => {
    // 验证是否登录，登录就可以发布案例
    if (status) {
      history.push("/caseShow/publishCase");
    } else {
      history.push("/waitToLogin");
    }
  };
  const onSearch = (searchText) => {
    setSearchText(searchText);
  };
  const myCase = () => {
    if (!status) {
      history.push("/waitToLogin");
      return;
    }
    SetisMyCase(!isMyCase);
  };
  const confirmDelete = (caseID) => {
    DeleteMyCase({ caseID })
      .then((res) => {
        setTotal(total - 1);
        message.info("删除成功");
      })
      .catch(() => {
        message.error("删除失败");
      });
  };

  const onClickEdit = (caseID) => {
    history.push("/caseShow/editCase?case_id=" + caseID);
  };

  return (
    <div>
      <PageHeader
        style={{ marginTop: "-20px", background: "#a3d6ff24" }}
        title="案例展示"
        subTitle="快来分享自己的案例成果吧!"
        extra={
          <Col>
            <Input.Search
              onSearch={onSearch}
              allowClear
              style={{ width: "60%" }}
              placeholder="人工智能"
            />
            &nbsp;&nbsp;
            <Button onClick={publishCase} type="primary">
              发布案例
            </Button>
            &nbsp;&nbsp;
            <Button
              style={{ background: isMyCase ? "blue" : "green" }}
              onClick={myCase}
              type="primary"
            >
              {isMyCase ? "案例大厅" : "我的案例"}
            </Button>
          </Col>
        }
      />
      <List
        itemLayout="horizontal"
        dataSource={caseList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              }
              title={
                <a
                  href={"/caseShow/viewCase/" + item.ID}
                  onClick={(e) => {
                    e.preventDefault();
                    onClickViewCase(item.ID);
                  }}
                >
                  {item.caseTitle}
                </a>
              }
              description={item.caseDiscription}
            />
            <Row align="middle">
              <Row style={{ color: "#00000073" }}>
                作者：{item.author} &nbsp;&nbsp; 时间：{item.created_at}
              </Row>

              {isMyCase && status ? (
                <Row>
                  <Col>
                    {" "}
                    <Button type="link" onClick={() => onClickEdit(item.ID)}>
                      编辑
                    </Button>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="确认删除吗?"
                      onConfirm={() => {
                        confirmDelete(item.ID);
                      }}
                      okText="是"
                      cancelText="否"
                    >
                      <Button type="link">删除</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              ) : null}
            </Row>
          </List.Item>
        )}
      />

      <Row justify="center">
        <Pagination
          style={{ margin: "20px 0px" }}
          defaultCurrent={1}
          total={total}
          showSizeChanger={false}
          current={pageNum}
          onChange={pageOnChange}
          pageSize={pageSize}
        />
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};

export default connect(mapStateToProps)(CaseShowIndex);
