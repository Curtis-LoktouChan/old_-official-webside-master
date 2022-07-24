import React from "react";
import { Link } from "react-router-dom";

import logo from "../header/logo.png";
import qrCode from "./QR-code.jpg";

import { Col, Row, Image } from "antd";

class Footer extends React.Component {
  render() {
    return (
      <div className="footerContainer">
        <Row align="middle" gutter={2}>
          <Col xs={{ span: 24 }} lg={{ span: 3, offset: 6 }}>
            <Image src={logo} width={150} preview={false} />
          </Col>
          <Col xs={{ span: 6, offset: 6 }} lg={{ span: 2, offset: 1 }}>
            <dl>
              <dd>
                <Link style={{ color: "#1890ff" }} to="/waitToDo">
                  报个bug
                </Link>
              </dd>
              <dd>
                <Link style={{ color: "#1890ff" }} to="/waitToDo">
                  常见问题
                </Link>
              </dd>
              <dd>
                <Link style={{ color: "#1890ff" }} to="/connectUs">
                  商务合作
                </Link>
              </dd>
            </dl>
          </Col>
          <Col xs={{ span: 6, offset: -6 }} lg={{ span: 3 }}>
            <dl>
              <dd>
                <Link style={{ color: "#1890ff" }} to="/waitToDo">
                  关于我们
                </Link>
              </dd>
              <dd>
                <Link style={{ color: "#1890ff" }} to="/connectUs">
                  联系我们
                </Link>
              </dd>
              <dd>微信公众号</dd>
            </dl>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 2 }}>
            <Image src={qrCode} width={100} />
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <dl>
              <dd>
                Copyright © 2021 - 现在 All Rights Reserved.
                华光人工智能教育机器人创新团队版权所有
                <br />
                备案号：粤ICP备19153801号-1
              </dd>
              <dd>TEL : 13360493656 联系/合作E-mail : 2638261141@qq.com</dd>
            </dl>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
