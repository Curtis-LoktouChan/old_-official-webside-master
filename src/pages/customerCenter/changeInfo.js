import React from "react";
import "./index.css";
import { connect } from "react-redux";
import { actions } from "../../constant/index";
import { Input, Button, message } from "antd";

class ChangeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      nickName: "",
      telephone: "",
    };
  }
  getMessage = () => {
    if (this.props.data) {
      const { username, telephone, nickName, grade } = this.props.data;
      this.setState({
        username: username,
        telephone: telephone,
        nickName: nickName,
        grade: grade,
      });
    } else {
      try {
        const token = localStorage.getItem("token");
        this.props.dispatch({
          type: actions.GET_USERINFODETAILS,
          data: token,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleReset = (e) => {
    this.getMessage();
  };
  handleConfirm = () => {
    const { username } = this.state;
    const { telephone } = this.state;
    if (username === "") {
      message.warning("用户名不能为空");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(telephone)) {
      message.warning("手机格式不正确");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      this.props.dispatch({
        type: actions.CHANGE_USER_INFO,
        data: { token: token, ...this.state },
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <>
        <Input
          name="username"
          addonBefore="用户名"
          type="text"
          value={this.state.username}
          onChange={this.handleOnChange}
          style={{ margin: "5px 0" }}
        />

        <Input
          name="nickName"
          addonBefore="昵称"
          type="text"
          value={this.state.nickName}
          onChange={this.handleOnChange}
          style={{ margin: "5px 0" }}
        />
        <Input
          name="grade"
          addonBefore="年级"
          type="text"
          value={this.state.grade}
          onChange={this.handleOnChange}
          style={{ margin: "5px 0" }}
        />
        <Input
          name="telephone"
          addonBefore="联系电话"
          type="text"
          value={this.state.telephone}
          onChange={this.handleOnChange}
          style={{ margin: "5px 0" }}
        />

        <Button type="primary" onClick={this.handleConfirm}>
          确认修改
        </Button>

        <Button type="primary" onClick={this.handleReset}>
          重置信息
        </Button>
      </>
    );
  }
  componentDidMount() {
    this.getMessage();
  }
  componentDidUpdate(oldProps) {
    // 只有 props 发生改变，才应该做处理
    if (oldProps !== this.props && this.props.data) {
      const { username, telephone, nickName } = this.props.data;
      this.setState({
        username: username,
        telephone: telephone,
        nickName: nickName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.customer,
  };
};

export default connect(mapStateToProps)(ChangeInfo);
