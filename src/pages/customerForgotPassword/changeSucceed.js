import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';

export default class ChangeSucceed extends React.Component {
    render() {
        return(
            <Result
            status="success"
            title="请求成功,请到注册邮箱确认!"
            subTitle="邮箱确认完成注册之后即可登录"
            extra={[
                <Button type="primary" key="login">
                    <Link to="/login">去登录</Link>
                </Button>,
                <Button key="back">
                    <Link to="/home">回到主页</Link>
                </Button>,
            ]}
          />
        );
    }
}
