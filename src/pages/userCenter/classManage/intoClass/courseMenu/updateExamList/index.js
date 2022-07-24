import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Space, Tag, Input, Table, Button, message, Popconfirm } from "antd";
import { PageHeader, Card } from "antd";
import Highlighter from "react-highlight-words";
import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { sectionTypeIcon } from "./../../../../../../constant/icon";
import http from "../../../../../../utils/http";

function getExamListBySectionIDReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/getExamList", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteExamReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("delete", "/api/v1/teacher/deleteExam", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function UpdateExamList(props) {
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  let searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`知识点`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            筛选
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "题号",
      dataIndex: "sn",
      key: "sn",
      sorter: (a, b) => a.sn - b.sn,
    },
    {
      title: "试题ID",
      dataIndex: "ID",
      key: "ID",
      sorter: (a, b) => a.ID - b.ID,
      render: (text) => <div style={{ color: "green" }}>{text}</div>,
    },
    {
      title: "题目",
      dataIndex: "examDiscrition",
      key: "examDiscrition",

      render: () => "题目过长暂不显示...",
    },
    {
      title: "题型",
      dataIndex: "examType",
      key: "examType",

      filters: [
        {
          text: "单选题",
          value: "单选题",
        },
        {
          text: "多选题",
          value: "多选题",
        },
        {
          text: "判断题",
          value: "判断题",
        },
      ],
      onFilter: (value, record) => record.examType.indexOf(value) === 0,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "知识点分类",
      dataIndex: "classify",
      key: "classify",
      ...getColumnSearchProps("classify"),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Space>
          {/* <Button
            onClick={() => {
              continueAddExam();
            }}
          >
            添加
          </Button> */}
          <Button
            onClick={() => {
              updateExam(record.ID);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确定要删除该试题吗"
            onConfirm={() => {
              deleteExam(record.ID);
            }}
            okText="是"
            cancelText="否"
          >
            {" "}
            <Button>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const history = useHistory();
  const [examListState, setExamListState] = useState(null);
  const { sectionID, classID } = history.location.state;

  const deleteExam = (examID) => {
    deleteExamReq({ examID, sectionID }).then((res) => {
      console.log(res);
      message.info(res.msg);
      history.push("/userCenter/intoClass/updateExamList", {
        classID,
        sectionID,
        examID,
      });
    });
  };
  const updateExam = (examID) => {
    history.push("/userCenter/intoClass/updateExamPage", {
      classID,
      sectionID,
      examID,
    });
  };

  const continueAddExam = () => {
    history.push("/userCenter/intoClass/continueAddExam", {
      classID,
      sectionID,
    });
  };

  const onBack = () => {
    history.push("/userCenter/intoClass/courseMenu");
  };

  useEffect(() => {
    getExamListBySectionIDReq({ sectionID, classID }).then((res) => {
      setExamListState(res.data);
    });
  }, [sectionID, classID, history.location.state]);
  return (
    <div style={{ margin: "0px 20px", border: "1px solid #96cefb5c" }}>
      <PageHeader
        title="查看题目列表"
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
            返回课程主页
          </Card>
        }
        onBack={onBack}
        subTitle={
          <Button
            type="primary"
            style={{ background: "green" }}
            onClick={continueAddExam}
          >
            继续添加
          </Button>
        }
        extra={[
          <div>
            <div style={{ fontWeight: "900" }}>试卷</div>
            {sectionTypeIcon["试题"]}
          </div>,
        ]}
        style={{ background: "#1890ff26", margin: "4px 0px" }}
      />
      <Table columns={columns} dataSource={examListState} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(UpdateExamList);
