import React from "react";
import { Link } from "react-router-dom";

import { Result, Button } from "antd";

import "./index.css";

class ChangeFailed extends React.Component {
  render() {
    return (
      <Result
        status="error"
        title="修改失败"
        subTitle="请根据提示检查注册信息或者稍后再进行修改"
        extra={[
          <Button type="primary" key="back">
            <Link to="/customerForgotpassword">返回忘记密码页</Link>
          </Button>,
          <Button key="backHome">
            <Link to="/home">返回主页</Link>
          </Button>,
        ]}
      ></Result>
    );
  }
}

export default ChangeFailed;
