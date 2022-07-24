import React from 'react';

import { Carousel, Image } from 'antd';
import "./index.css";

// 需添加可适应的图片
const contentStyle = {
  height: 'auto',    /** 1920*600 的图片去掉左右 300px 的高度 */
  color: '#fff',
  lineHeight: '20vh',
  textAlign: 'center',
  background: '#364d79',
};
export default class MyCarousel extends React.Component {
    render () {
        return (
            <div className="carouselContainer">
                <Carousel autoplay>
                    <div>
                        <Image src="assets/carousels/carousel1.jpg" style={contentStyle} preview={false}/>
                    </div>
                    <div>
                        <Image src="assets/carousels/carousel2.jpg" style={contentStyle} preview={false}/>
                    </div>
                    <div>
                        <Image src="assets/carousels/carousel3.jpg" style={contentStyle} preview={false}/>
                    </div>
                    <div>
                        <Image src="assets/carousels/carousel4.jpg" style={contentStyle} preview={false}/>
                    </div>
                </Carousel>
            </div>
        )
    }
};