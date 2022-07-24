import React from "react";
import { Link } from "react-router-dom";
import { Result, Button, Layout } from "antd";
import { RocketTwoTone } from "@ant-design/icons";

import Footer from "../components/footer";
import Header from "../components/header";

class WaitToLogin extends React.Component {
  render() {
    return (
      <Layout className="homeContainer">
        <Layout style={{ background: "#ffffff" }}>
          <Header />
        </Layout>
        <Layout.Content>
          <div className="waitContainer">
            <div>
              <Result
                icon={<RocketTwoTone />}
                title="您尚未登录"
                extra={
                  <span>
                    <Button type="primary">
                      <Link to="/home">返回主页</Link>
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary">
                      <Link to="/login">去登陆</Link>
                    </Button>
                  </span>
                }
              />
            </div>
          </div>
        </Layout.Content>
        <Layout.Footer justify="space-around" align="middle">
          <Footer />
        </Layout.Footer>
      </Layout>
    );
  }
}
export default WaitToLogin;
