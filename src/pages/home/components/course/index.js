import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { actions } from "../../../../constant";
import "./index.css";
import { Button, Card } from "antd";
import { ProfileTwoTone } from "@ant-design/icons";

import work from "./course.jpg";

class Course extends React.Component {
  renderCourseList = () => {
    if (this.props.data && this.props.data.length) {
      const { data } = this.props;
      return data.map((item) => {
        // 在首页只渲染3个
        if (item.id <= 3) {
          return (
            <Card
              key={item.id}
              className="courseCard"
              hoverable
              cover={<img src={work} alt={"课程视频" + item.id} />}
            >
              <Link to="courseCenter">
                <Card.Meta title={item.title} description={item.details} />
              </Link>
            </Card>
          );
        } else {
          return false;
        }
      });
    }
  };
  render() {
    return (
      <div className="courseContainer">
        <div>
          <div className="courseTitle">
            <ProfileTwoTone />
            <span>课程案例</span>
          </div>
          <div className="courseContext">{this.renderCourseList()}</div>
          <Button size="small">
            <Link to="/courseCenter">查看更多&gt;&gt;</Link>
          </Button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // this.props.getCourse();
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.home.course,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 获取课程列表 action
    getCourse: () => {
      dispatch({
        type: actions.GET_COURSE,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
