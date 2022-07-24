/**
 * 页面垂直滚动动画
 * @param {Number} currentY 当前纵轴位置
 * @param {Number} targetY 目标纵轴位置
 */
const scrollAnimation = (currentY, targetY) => {
    // 获取当前位置
    let newCurrentY = currentY || document.documentElement.scrollTop || document.body.scrollTop;
    let needScrollTop = targetY - newCurrentY;

    function scrollTopTo() {
        // 一帧的滑动像素
        const distance = Math.ceil(needScrollTop / 10);
        newCurrentY += distance;
        needScrollTop = targetY - newCurrentY;
        document.documentElement.scrollTop = newCurrentY;
        // 停止条件
        if(needScrollTop < -10 || needScrollTop > 10) {
            requestAnimationFrame(scrollTopTo);
        }
    }
    requestAnimationFrame(scrollTopTo);
    
    document.documentElement.scrollTop = newCurrentY;
}
/**
 * 处理鼠标滚动时导航固钉的样式
 * @param {NodeList} affixContext 导航固钉的元素list
 * @param {Array} containerOffsetTop containerDiv的offset值
 */
const scrollHandleAffix = (affixContext, containerOffsetTop) => {
    // 需要处理子元素的offsetTop，将其与当前的body的scrollTop比较得到结果
    const body = document.documentElement;
    const affixLen = affixContext.length;
    const bodyScrollTop = document.documentElement.scrollTop;
    for(let i = 0; i < containerOffsetTop.length; i++) {
        // 大于上一个div的一半时切换到当前div
        if((bodyScrollTop >= containerOffsetTop[i] - 100) && (bodyScrollTop < containerOffsetTop[i + 1] - 100)) {
            affixContext[i].className = "current";
        } else {
            affixContext[i].className = "";
        }
        if(bodyScrollTop + body.clientHeight >= body.scrollHeight) {
            affixContext[affixLen - 1].className = "current";
        }
    }
}

/**
 * fetch请求，post方式
 * @param {string} url 请求地址
 * @param {Object} data 请求的消息体数据
 * @param {token} token token值，可选参数
 * @returns {Promise} response 
 * 无论请求成功或失败都返回Promise.resolve,
 * 仅当网络故障或者请求被停止时返回promise.reject，
 * 返回的仅是HTTP响应，需要在then中转换为json格式
 */
const postData = (url, data, token) => {
    let headers = {'content-type': 'application/json'};
    if(token) {
        headers = {'content-type': 'application/json', 'Authorization': token}
    }
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: headers,
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // CORS ：跨域资源共享
        // mode: 'no-cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    });
};

/**
 * 下载文件函数
 * @param {object} data 从服务器端传回来的文件流
 * @param {string} filename 下载的文件名
 */
const downloadFiles = (data, filename) => {
	// 接收的是文件流，需要转化一下
    var blob = new Blob([data])
    if (typeof window.chrome !== 'undefined') {
        // Chrome version
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE version
        blob = new Blob([data], { type: 'application/force-download' });
        window.navigator.msSaveBlob(blob, filename);
    } else {
        // Firefox version
        var file = new File([data], filename, { type: 'application/force-download' });
        window.open(URL.createObjectURL(file));
    }
}

module.exports = {
    scrollAnimation,
    scrollHandleAffix,
    postData,
    downloadFiles
};