import React from "react";
import { Link } from "react-router-dom";

import './index.css';

import { Image, Button } from "antd";
import { IdcardTwoTone } from "@ant-design/icons";

export default class Introduction extends React.Component {
    render() {
        return(
            <div className="introductionContainer">
                <div>
                    <div className="introductionTitle">
                        <IdcardTwoTone />
                        <span>关于我们</span>
                    </div>
                    <div className="introductionContext">
                        <div className="introductionContextImgLeft">
                            <Image src="assets/aboutUs.png" />
                        </div>
                        <div className="introductionContextText">
                            <p>
                                我们是华光人工智能教育机器人创新团队，简称华光教育，是研发智能教育机器人的硬件、软件、课程、平台的创新团队，致力于普及与推广中小学人工智能教育。
                                <br />
                                团队是一支复合型的队伍。成员分别来自“双一流”建设高校华南师范大学的信息光电子科技学院、物理与电信学院和经济与管理学院。涵盖技术类专业、教育类专业以及管理类专业。
                            </p>
                            <Button size="small" type="primary"><Link to="/waitToDo">查看更多&gt;&gt;</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}