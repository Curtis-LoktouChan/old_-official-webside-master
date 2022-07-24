import React from "react";
import { Layout } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import CourseExam from "../courseCenter/courseExam";

class CourseQuestion extends React.Component {
    render() {
        return (
            <Layout className="homeContainer">
                <Layout.Content>
                    <Header />
                    {/* <CourseQuestionDetail /> */}
                    <CourseExam />
                </Layout.Content>
                <Layout.Footer justify="space-around" align="middle">
                    <Footer />
                </Layout.Footer>
            </Layout>
        );
    }
}

export default CourseQuestion;
