import React from "react";
import axios from "axios";
import { Button } from "antd";

import "./index.css";
import { Link } from "react-router-dom";

class CourseDisplayDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayData: {} };
    }
    render() {
        return (
            <div className="courseDisplayContainer">
                <div className="courseDisplayTitleLine">
                    <div className="title">
                        {this.state.displayData.section}
                    </div>
                    <Button size="middle">
                        <Link to="/courseCenter">返回</Link>
                    </Button>
                </div>
                <div className="courseDisplayContent">
                    <iframe
                        src={this.state.displayData.videoUrl}
                        scrolling="no"
                        border="0"
                        frameBorder="no"
                        allowFullScreen
                        title="navigation"
                    ></iframe>
                </div>
            </div>
        );
    }
    componentDidMount() {
        /** 请求数据到 state */
        const url = `https://api.huiaistar.com/api/courseVideo/${window.location.search}`;
        const res = axios.get(url);
        res.then((res) => {
            this.setState({ displayData: res.data });
        }).catch((rej) => {
            console.log(rej);
        });
    }
}

export default CourseDisplayDetail;
