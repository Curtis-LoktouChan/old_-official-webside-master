import React from "react";
import { connect } from "react-redux";
import { Button, Image, Row, } from "antd";
import { WindowsFilled, FileAddTwoTone } from "@ant-design/icons";
import "./index.css";
// import { actions } from "../../constant";

class Windows extends React.Component {
  handleCardOnClickNOR = () => {
    window.open(" https://pan.baidu.com/s/1qXN-A3ck3tn7oZhKzsRlTw");
  };
  // handleCardOnClickPRO = (e) => {
  //   window.open("https://pan.baidu.com/s/1wx6ZC-zg8r0rtOWeORoygg");
  //   // try {
  //   //     if(window.confirm(`是否要下载Windows版本软件`)) {
  //   //         this.props.dispatch({
  //   //             type: actions.GET_WINDOWS_SOFT
  //   //         });
  //   //     }
  //   // } catch (error) {
  //   //     console.log(error);
  //   // }
  // };
  render() {
    return (
      <div className="windowsContainer">
        <div>
          <div className="windowsTitle">
            <WindowsFilled style={{ color: "#1890ff" }} />
            <span>Windows版本</span>
          </div>
          <div className="windowsContext">
            <div className="windowsContextImgLeft">
              <Image src="assets/aboutUs.png" />
            </div>
            <div className="windowsContextText">
              <p>
                在笔记本电脑Windows系统上运行，能够通过运行对应的仿真器，模拟对硬件硬件的控制。
                <br />
                一款Windows上的图形化编程软件。
              </p>
              <Row>
                <p style={{ color: "red" }}>提取码:hv72</p>
                </Row>                
                <Row>
                <Button
                  type="primary"
                  icon={<FileAddTwoTone />}
                  onClick={this.handleCardOnClickNOR}
                >
                  点我下载
                </Button>       
                
                </Row>

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

export default connect(mapStateToProps)(Windows);
