import React from "react";
import { Menu } from "antd";

import InfoDetails from "./infoDetails";
import ChangeInfo from "./changeInfo";
import "./index.css";

class CustomerCenterSider extends React.Component {
  state = {
    current: "1",
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  renderContext() {
    switch (this.state.current) {
      case "1":
        return (
          <div className="infoDetails">
            <InfoDetails />
          </div>
        );
      case "2":
        return (
          <div className="changeInfo">
            <ChangeInfo />
          </div>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <div className="userInfoContainer">
        <div>
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <Menu.Item key={1}>我的信息</Menu.Item>
            <Menu.Item key={2}>修改信息</Menu.Item>
          </Menu>
          <div className="userInfoContext">{this.renderContext()}</div>
        </div>
      </div>
    );
  }
}

export default CustomerCenterSider;
