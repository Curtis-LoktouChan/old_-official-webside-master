import React from "react";
import { Link } from "react-router-dom";

import { Button, Card } from 'antd';
import { CarTwoTone } from '@ant-design/icons';

import "./index.css";

class Hardware extends React.Component {
    render() {
        return(
            <div className="hardwareContainer">
                    <div>
                        <div className="hardwareTitle">
                            <CarTwoTone />
                            <span>硬件系统</span>
                        </div>
                        <div className="hardwareContext">
                            <Card className="hardwareCard"
                                hoverable
                                cover={
                                    <img src="assets/hardwares/raspberryExtend.png" alt="树莓派拓展版"/>
                                }    
                            >
                                <Card.Meta title="树莓派拓展版" />
                            </Card>
                            <Card className="hardwareCard"
                                hoverable
                                cover={
                                    <img src="assets/hardwares/CACA NO.1.jpg" alt="CACA NO.1" />
                                }    
                            >
                                <Card.Meta title="CACA机器人一号" />
                            </Card>
                            <Card className="hardwareCard"
                                hoverable
                                cover={
                                    <img src="assets/hardwares/CACA NO.2.jpg" alt="CACA NO.2" />
                                }    
                            >
                                <Card.Meta title="CACA机器人二号" />
                            </Card>
                            <Card className="hardwareCard"
                                hoverable
                                cover={
                                    <img src="assets/hardwares/CACA NO.3.jpg" alt="CACA NO.3" />
                                }    
                            >
                                <Card.Meta title="华小光" />
                            </Card>
                        </div>
                        <Button size="small"><Link to="/waitToDo">查看更多&gt;&gt;</Link></Button>
                    </div>
                </div>
        )
    }
}

export default Hardware;