import React from 'react';
import './index.css';

import { connect } from 'react-redux';

import Header from "../components/header";
import Footer from "../components/footer";
import MyCarousel from "./components/carousel";
import Introduction from "./components/introduction";
import Hardware from "./components/hardware";
import Course from "./components/course";
import Work from "./components/work";
import SoftDownload from "./components/softDownload";
import HomeAffix from "./components/affix";

import { ConfigProvider, Layout } from "antd";

class Home extends React.Component {
    render() {
        return (
            <ConfigProvider locale='zh-cn'>
                <Layout>
                    <Layout.Content className="homeContainer">
                        <HomeAffix />
                        <Header />
                        <MyCarousel />
                        <Introduction />
                        <Hardware />
                        <Course />
                        <Work />
                        <SoftDownload />
                    </Layout.Content>
                    <Layout.Footer justify="space-around" align="middle">
                        <Footer />
                    </Layout.Footer>
                </Layout>
            </ConfigProvider>
        )
    }

    // home 页面首次挂载，从 location 中解构出state
    componentDidMount() {
        
    }

}

const mapStateToProps = state => {
    return {
        ...state.home
    };
};


export default connect(mapStateToProps,)(Home);