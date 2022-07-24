import React from "react";
import { Link } from "react-router-dom";

import './index.css';

import { Image, Button } from "antd";

class SoftDownload extends React.Component {
    render() {
        return (
            <div className="softDownloadContainer">
                <div className="softDownloadContext">
                    <div className="softDownloadContextImgLeft">
                        <Image src="assets/softDownload.jpg" />
                    </div>
                    <div className="softDownloadContextText">
                        <div className="softDownloadTitle">
                            <span>软件下载</span>
                        </div>
                        <p>
                            软件简介：一款图形化编程软件，能够配合树莓派以及硬件使用，也能在window上面流畅运行对应仿真程序，具备编写人工智能程序能力
                        </p>
                        <Button size="small" type="primary"><Link to="/softDownload">前往下载&gt;&gt;</Link></Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SoftDownload;