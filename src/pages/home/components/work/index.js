import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actions, userLoginStatus, eventName } from "../../../../constant";
import "./index.css";
import { Upload, message, Button, Card } from "antd";
import {
  UploadOutlined,
  FileTextTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import work from "./work.png";

import PubSub from "pubsub-js";

class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
    this.userLoginSucceed = null; // 登录成功订阅 id
    this.userLoginFailed = null; // 登录失败订阅 id

    this.uploadProps = {
      name: "file",
      action: "https://api.huiaistar.com/api/v1/projectFiles",
      headers: {
        // 请求头携带 token
        Authorization: localStorage.getItem("token"),
      },
      showUploadList: false,
      accept: ".xml,.ylh",
      multiple: true,
      // 使用箭头函数避免 this 丢失
      onChange: (info) => {
        if (info.file.status !== "uploading") {
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} 上传成功`);
          this.sendGetWorkAction();
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传失败 ${info.file.response}`);
        }
      },
    };
  }

  sendGetWorkAction() {
    try {
      // 获取 token
      // 如果 token 存在，则进行 GET_WORK action 发送
      const token = localStorage.getItem("token");
      if (token) {
        this.props.getWork(token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderWorkList() {
    if (this.props.work.data && this.props.work.data.length) {
      const { data } = this.props.work;
      return data.map((item, key) => {
        // 主页展示4个
        console.log(item, key);
        if (key < 1) {
          return (
            <Card
              key={item.id}
              className="workCard"
              hoverable
              cover={<img src={work} alt={"作品图片" + item.id} />}
            >
              <Card.Meta title={item.projectName} description={item.details} />
            </Card>
          );
        } else {
          return false;
        }
      });
    }
    return (
      <div style={{ fontSize: "18px" }}>
        <p>还没有作品哟~</p>
      </div>
    );
  }
  render() {
    if (this.state.isLogged) {
      return (
        <div className="workContainer">
          <div>
            <div className="workTitle">
              <FileTextTwoTone />
              <span>我的作品</span>
            </div>
            <div className="workContext">{this.renderWorkList()}</div>
            <div className="workUploadButton">
              <Upload {...this.uploadProps}>
                <Button type="primary" icon={<UploadOutlined />}>
                  上传作品
                </Button>
              </Upload>
            </div>
            <Button size="small">
              <Link to="/customerWork">查看更多&gt;&gt;</Link>
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="workContainer notLoggedInWorkContainer">
          <div>
            <div className="workTitle">
              <FileTextTwoTone />
              <span>我的作品</span>
            </div>
            <div className="notLoggedInWorkContext">
              <Link to="/Login">
                <div>
                  <LockOutlined
                    style={{
                      transform: "scale(4.0)",
                      color: "#943737",
                    }}
                  />
                </div>
                <span>去登陆</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  // 订阅
  // 请在此处添加一个关于 user.status 的监听器, 用于监听 LOGIN_WITH_TOKEN 的成功事件
  // 页面跳转的 LOGIN 成功事件判断 this.props.user.status
  componentDidMount() {
    if (this.props.user.status === userLoginStatus.SUCCEED) {
      this.sendGetWorkAction();
    }
    // 这里需要注意 this 的指向 使用箭头函数使内部 this 指向执行上下文
    this.userLoginSucceed = PubSub.subscribe(
      eventName.SUCCESS_LOGIN,
      (eventName, data) => {
        this.sendGetWorkAction();
      }
    );
    this.userLoginFailed = PubSub.subscribe(
      eventName.FAIL_LOGIN,
      (eventName, data) => {
        this.setState({ isLogged: false });
        // 改变 state.home.work ,更新数据帧
        this.props.resetWork();
      }
    );
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.userLoginSucceed);
    PubSub.unsubscribe(this.userLoginFailed);
  }
  // 只要页面更新，就会触发该钩子函数
  // 触发点：1.props改变 2.setState 3.forceUpdate
  componentDidUpdate(oldProps) {
    // 只有 props 发生改变，才应该做处理
    if (
      oldProps !== this.props &&
      this.props.user.status === userLoginStatus.SUCCEED
    ) {
      this.setState({ isLogged: true });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    work: state.home.work,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 获取课程列表 action
    getWork: (token) => {
      dispatch({
        type: actions.GET_WORK,
        token: token,
      });
    },
    // 重置 state.home.work
    resetWork: () => {
      dispatch({
        type: actions.RESET_WORK,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);
