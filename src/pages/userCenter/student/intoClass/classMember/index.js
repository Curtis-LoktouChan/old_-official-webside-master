import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Avatar,
  Button,
  Tag,
  message,
} from "antd";
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import http from "../../../../../utils/http";
const EditableContext = React.createContext(null);

function updateInformationReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("put", "/api/v1/teacher/studentList", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function getClassMemberReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("get", "/api/v1/teacher/studentList", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function deleteStudentFromClassReq(params) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    http("delete", "/api/v1/teacher/studentList", params, token).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>{children}</div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

function ClassMember(props) {
  const [dataSource, SetDataSource] = useState(null);

  useEffect(() => {
    getClassMemberReq({ classID: props.classID }).then((res) => {
      const data = res.data.map((item, key) => {
        item.key = key;
        item.id = key + 1;
        return item;
      });

      SetDataSource(data);
    });
  }, [props.classID, props]);

  const handleSave = (row) => {
    let telephone;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    if (row.telephone === "") {
      telephone = "xxxxxxxxxxx";
    } else {
      telephone = row.telephone;
    }

    updateInformationReq({
      username: item.username,
      nickName: row.nickName,
      telephone: telephone,
    })
      .then((res) => {
        message.info(res.msg);
        SetDataSource(newData);
      })
      .catch((err) => {
        message.warning("不能修改:" + err.response.data.msg);
      });
  };
  const handleOnChange = () => {
    console.log("change");
  };

  const handleDelete = (record) => {
    deleteStudentFromClassReq({
      studentUsername: record.username,
      className: props.className,
    })
      .then((res) => {
        message.info(res.msg);
        const newData = dataSource.filter((item) => item.key !== record.key);
        SetDataSource(newData);
      })
      .catch((err) => {
        message.warning(err.response.data.msg);
      });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
    },
    {
      title: "头像",
      dataIndex: "headImg",
      render: () => (
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      ),
    },

    {
      title: "姓名",
      dataIndex: "nickName",
      width: "15%",
      editable: true,
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "角色",
      dataIndex: "roleId",
      render: (item) =>
        item === "1" ? (
          <Tag color="blue">学生</Tag>
        ) : (
          <Tag color="purple">教师</Tag>
        ),
    },
    {
      title: "手机号",
      dataIndex: "telephone",
      width: "20%",
      editable: true,
      render: (telephone) => (telephone !== "" ? telephone : "xxxxxxxxxxx"),
    },

    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 && record.roleId === "1" ? (
          <Popconfirm
            title="确定该学生退出班级吗?"
            onConfirm={() => handleDelete(record)}
          >
            <Button size="small" shape="round" type="primary">
              撤销选课
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const newcolumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <Table
      rowClassName={() => "editable-row"}
      components={components}
      columns={newcolumns}
      dataSource={dataSource}
      onChange={handleOnChange}
      pagination={{ position: ["bottomCenter"] }}
      size="small"
    />
  );
}
const mapStateToProps = (state) => {
  return {
    ...state.teacherClassInfo,
  };
};

export default connect(mapStateToProps)(ClassMember);
