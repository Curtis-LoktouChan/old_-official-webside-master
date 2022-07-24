import React from "react";
import { Layout } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import CourseDisplayDetail from "./main";

class CourseDisplay extends React.Component {
    render() {
        return (
            <Layout className="homeContainer">
                <Layout.Content>
                    <Header />
                    <CourseDisplayDetail />
                </Layout.Content>
                <Layout.Footer justify="space-around" align="middle">
                    <Footer />
                </Layout.Footer>
            </Layout>
        );
    }
}

export default CourseDisplay;
