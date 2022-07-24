import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

const { Paragraph, Text } = Typography;

class SignUpFailed extends React.Component {
  render() {
    return (
      <Result
        status="error"
        title="注册失败"
        subTitle="请根据提示检查注册信息或者稍后再进行注册"
        extra={[
          <Button type="primary" key="back">
            <Link to="/signUp">返回注册页</Link>
          </Button>,
          <Button key="backHome">
            <Link to="/home">返回主页</Link>
          </Button>,
        ]}
      >
        <div className="desc">
          {/* 错误提醒 */}
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              你提交的内容可能有如下错误：
            </Text>
          </Paragraph>
          <Paragraph style={{ fontSize: "16px", color: "#333" }}>
            <CloseCircleOutlined
              className="site-result-demo-error-icon"
              style={{ paddingRight: "10px" }}
            />
            错误信息：
            {this.props.errorMessage.msg}
          </Paragraph>
        </div>
      </Result>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.signUp,
  };
};

export default connect(mapStateToProps)(SignUpFailed);
