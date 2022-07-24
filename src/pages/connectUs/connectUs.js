import React from 'react';

import { Descriptions, Image } from 'antd';
import "./index.css"
class Connect extends React.Component {
    render(){
        return(
            <div className="connectContainer">
                <div>
                    <div className="connectContext">
                        <Descriptions title="联系我们">
                        <Descriptions.Item label="团队">华光人工智能教育机器人创新团队</Descriptions.Item>
                        <Descriptions.Item label="电话">13360493656 </Descriptions.Item>
                        <Descriptions.Item label="工作地点">广州市番禺大学城</Descriptions.Item>
                        <Descriptions.Item label="微信">
                            <Image width={150} src="assets/QR-code.jpg" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                        University Town, Fanyu District, Guangzhou, Guangdong, 510006 P.R. China
                        </Descriptions.Item>
                      </Descriptions> 
                      </div>
                </div>     
            </div>
          )
    }
}





export default Connect;