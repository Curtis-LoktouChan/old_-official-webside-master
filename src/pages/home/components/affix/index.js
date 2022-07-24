import React from "react";
import { Affix } from "antd";
import { scrollAnimation, scrollHandleAffix } from "../../../../constant/func";

import "./index.css";

class HomeAffix extends React.Component {
    handleClick(event) {
        const target = event.target;
        let divContainer = null;
        switch (target.id) {
            case 'us':
                divContainer = document.getElementsByClassName("introductionContainer");
                break;
            case 'hardware':
                divContainer = document.getElementsByClassName("hardwareContainer");
                break;
            case 'course':
                divContainer = document.getElementsByClassName("courseContainer");
                break;
            case 'work':
                divContainer = document.getElementsByClassName("workContainer");
                break;
            case 'software':
                divContainer = document.getElementsByClassName("softDownloadContainer");
                break;
            default:
                break;
        }
        if(divContainer) {
            const targetContainer = divContainer[0];
            const targetY = targetContainer.offsetTop;
            /** 注意在标准模式下不要使用document.body来获取body元素 */
            const currentY = document.documentElement.scrollTop;
            scrollAnimation(currentY, targetY);
            // 设置样式
            const siblingsElement = target.parentElement.parentElement.children;
            for(let i = 0; i < siblingsElement.length; i++) {
                if(siblingsElement[i].firstChild.hasAttribute('class')) {
                    siblingsElement[i].firstChild.removeAttribute('class');
                }
            }
            target.className = 'current';
        }
    }
    scrollHandle = () => {
        const nodeList = document.querySelectorAll('.homeContainer>div');
        const affixContext = document.querySelectorAll('.affixContext>dl>dd>span');
        let containerOffsetTop = [];
        for(let i = 3; i < nodeList.length; i++) {
            containerOffsetTop[i-3] = nodeList[i].offsetTop;
        }
        
        scrollHandleAffix(affixContext, containerOffsetTop);
    }
    handleScroll() {
        window.addEventListener('scroll', this.scrollHandle)
    }
    render() {
        return(
            <Affix className="affixContainer" offsetTop={50}>
                <div className="affixContext" onClick={this.handleClick.bind(this)}>
                    <dl>
                        <dd>
                            <span id="us">关于我们</span>
                        </dd>
                        <dd>
                            <span id="hardware">硬件系统</span>
                        </dd>
                        <dd>
                            <span id="course">课程案例</span>
                        </dd>
                        <dd>
                            <span id="work">我的作品</span>
                        </dd>
                        <dd>
                            <span id="software">软件下载</span>
                        </dd>
                    </dl>
                </div>
            </Affix>
        )
    }

    componentDidMount() {
        this.handleScroll();
    }
}

export default HomeAffix;