import React from "react";
import { Result } from "antd";
import { RocketTwoTone } from "@ant-design/icons";
import "./index.css";

class NoDataNow extends React.Component {
  render() {
    return (
      <div className="waitContainer">
        <div>
          <Result icon={<RocketTwoTone />} title="我们正在努力！敬请期待~" />
        </div>
      </div>
    );
  }
}
export default NoDataNow;
