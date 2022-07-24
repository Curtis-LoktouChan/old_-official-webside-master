import React from "react";
import axios from "axios";
import "./index.css";

class CourseQuestionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questionData: {} };
    }
    render() {
        return <></>;
    }
    componentDidMount() {
        /** 请求数据到 state */
        const url = `https://api.huiaistar.com/api/questionList/${window.location.search}`;
        const res = axios.get(url);
        res.then((res) => {
            this.setState({ displayData: res.data });
        }).catch((rej) => {
            console.log(rej);
        });
    }
}

export default CourseQuestionDetail;
