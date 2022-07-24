import React from "react";
import "./index.css";

import { Image } from "antd";

class Banner extends React.Component {
  render() {
    return (
      <div className="bannerContainer">
        <div>
          <Image src={this.props.imgSrc} width={"80%"} preview={false} />
        </div>
      </div>
    );
  }
}

export default Banner;
