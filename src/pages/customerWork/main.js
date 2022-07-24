import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Upload, message, Card, Pagination } from "antd";
import { FileTextTwoTone, UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { actions } from "../../constant";
import { BASE_URL } from "../../constant/config";

class WorkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
    this.uploadProps = {
      name: "file",
      action: BASE_URL + "/api/v1/projectFiles",
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
  sendGetWorkAction = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        this.props.getWork(token, this.state.current);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleCardOnClick = (e) => {
    try {
      const projectName =
        e.currentTarget.parentNode.parentNode.previousSibling.innerHTML;
      if (window.confirm(`是否要下载${projectName}`)) {
        const token = localStorage.getItem("token");
        if (token) {
          this.props.downLoadWork(token, projectName);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteOnClick = (e) => {
    try {
      const projectName =
        e.currentTarget.parentNode.parentNode.previousSibling.innerHTML;
      if (window.confirm(`是否要删除${projectName}`)) {
        const token = localStorage.getItem("token");
        if (token) {
          this.props.deleteWork(token, projectName);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  handlePageChange = (page) => {
    this.setState({ current: page });
    try {
      const token = localStorage.getItem("token");
      if (token) {
        this.props.getWork(token, page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderWorkList = () => {
    if (this.props.workList && this.props.workList.length) {
      console.log("aaa", this.props);
      const { workList } = this.props;
      return workList.map((item) => {
        return (
          <Card
            key={item.id}
            className="customerWorkCard"
            hoverable
            cover={
              <img src={"assets/works/work.png"} alt={"作品图片" + item.id} />
            }
          >
            <Card.Meta
              title={item.projectName}
              description={
                <div className="cardButtonsContainer">
                  <Button
                    size="small"
                    type="primary"
                    onClick={this.handleCardOnClick}
                  >
                    下载作品
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={this.handleDeleteOnClick}
                  >
                    删除作品
                  </Button>
                </div>
              }
            />
          </Card>
        );
      });
    }
    return <div className="noWork">还没有作品哟~</div>;
  };
  render() {
    return (
      <div className="customerWorkContainer">
        <div>
          <div className="customerWorkTitle">
            <FileTextTwoTone />
            <span>我的作品</span>
          </div>
          <div className="customerWorkContext">{this.renderWorkList()}</div>
          <div className="customerWorkPageControl">
            <Pagination
              showQuickJumper
              showSizeChanger={false}
              defaultCurrent={1}
              defaultPageSize={12}
              total={this.props.total}
              current={this.state.current}
              onChange={this.handlePageChange}
            />
          </div>
          <div className="customerWorkUploadButton">
            <Upload {...this.uploadProps}>
              <Button type="primary" icon={<UploadOutlined />}>
                上传作品
              </Button>
            </Upload>
          </div>
          <Button>
            <Link to="/home">返回主页</Link>
          </Button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.sendGetWorkAction();
  }
  componentDidUpdate(oldProps) {
    // 处理 workList 数据
    if (oldProps !== this.props && !oldProps.isDelete && this.props.isDelete) {
      this.sendGetWorkAction();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.customerWork,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWork: (token, page) => {
      dispatch({
        type: actions.GET_CUSTOMER_WORK,
        token: token,
        page: page,
      });
    },
    downLoadWork: (token, projectName) => {
      dispatch({
        type: actions.CUSTOMER_DOWNLOAD_WORK,
        token: token,
        projectName: projectName,
      });
    },
    deleteWork: (token, projectName) => {
      dispatch({
        type: actions.CUSTOMER_DELETE_WORK,
        token: token,
        projectName: projectName,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetails);
