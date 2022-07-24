import React from 'react';

import { Layout } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
import WorkDetails from "./main";

class CustomerWork extends React.Component {
    render(){
        return(
            <Layout className="homeContainer">
                <Layout.Content>
                    <Header />
                    <Banner imgSrc="assets/banners/customerWork.jpg" />
                    <WorkDetails />
                </Layout.Content>
                <Layout.Footer justify="space-around" align="middle">
                    <Footer />
                </Layout.Footer>
            </Layout>
        )
    }
}

export default CustomerWork;