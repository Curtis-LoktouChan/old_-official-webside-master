import React from "react";
import { connect } from "react-redux";
import { Image } from "antd";
import { CarTwoTone } from "@ant-design/icons";
import "./index.css";
import { actions } from "../../constant";

class Raspberry extends React.Component {
  handleCardOnClick = (e) => {
    try {
      if (window.confirm(`是否要下载树莓派版本软件`)) {
        this.props.dispatch({
          type: actions.GET_RASPBERRY_SOFT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="raspberryContainer">
        <div>
          <div className="raspberryTitle">
            <CarTwoTone />
            <span>树莓派版本</span>
          </div>
          <div className="raspberryContext">
            <div className="raspberryContextImgLeft">
              <Image src="assets/aboutUs.png" />
            </div>
            <div className="raspberryContextText">
              <p>
                在树莓派上运行，能够与硬件通信，完成对硬件硬件的控制。
                <br />
                一款树莓派上的图形化编程软件。
              </p>
              {/* <Button type="primary" icon={<FileAddTwoTone />} onClick={this.handleCardOnClick}>立即下载</Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.soft,
  };
};

export default connect(mapStateToProps)(Raspberry);
