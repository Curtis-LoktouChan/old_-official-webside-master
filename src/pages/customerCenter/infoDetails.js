import React from "react";
import "./index.css";
import { connect } from "react-redux";

import { actions } from "../../constant/index";

import { Input } from "antd";

class InfoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      telephone: "",
      nickName: "",
      grade: "",
    };
  }
  render() {
    return (
      <div>
        <Input
          addonBefore="用户名"
          type="text"
          disabled={true}
          value={this.state.username}
          style={{ margin: "5px 0" }}
        />

        <Input
          addonBefore="昵称"
          type="text"
          disabled={true}
          value={this.state.nickName}
          style={{ margin: "5px 0" }}
        />
        <Input
          addonBefore="年级"
          type="text"
          disabled={true}
          value={this.state.grade}
          style={{ margin: "5px 0" }}
        />

        <Input
          addonBefore="联系电话"
          type="text"
          disabled={true}
          value={this.state.telephone}
          style={{ margin: "5px 0" }}
        />

        <Input
          addonBefore="电子邮箱"
          type="text"
          disabled={true}
          value={this.state.email}
          style={{ margin: "5px 0" }}
        />
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.props.dispatch({
      type: actions.GET_USERINFODETAILS,
      token: token,
    });
    if (this.props.data) {
      const { username, email, telephone, nickName, grade } = this.props.data;
      this.setState({
        username,
        email,
        telephone,
        nickName,
        grade,
      });
    } else {
      try {
        const token = localStorage.getItem("token");
        this.props.dispatch({
          type: actions.GET_USERINFODETAILS,
          token: token,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  componentDidUpdate(oldProps) {
    // 只有 props 发生改变，才应该做处理
    if (oldProps !== this.props && this.props.data) {
      const { username, email, phone } = this.props.data;
      this.setState({
        username: username,
        email: email,
        phone: phone,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.customer,
  };
};

export default connect(mapStateToProps)(InfoDetails);
