import React from "react";
import { Link } from "react-router-dom";
import { Result, Button, Layout } from "antd";
import { RocketTwoTone } from "@ant-design/icons";

import Header from "../components/header";
import Footer from "../components/footer";

class WaitToDo extends React.Component {
  render() {
    return (
      <Layout className="homeContainer">
        <Layout.Content>
          <Header />
          <div className="waitContainer">
            <div>
              <Result
                icon={<RocketTwoTone />}
                title="我们正在努力！敬请期待~"
                extra={
                  <Button type="primary">
                    <Link to="/home">返回主页</Link>
                  </Button>
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
export default WaitToDo;
