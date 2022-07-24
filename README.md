# 华光人工智能教育创新团队官网项目文档

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## :bell:脚本

In the project directory, you can run:

### :one:`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### :two:`yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### :three:`yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### :four:`yarn eject`（请不要使用此命令，将会启动多页模式，需要启动时请认真了解改命令的作用并修改好项目的配置文件）

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## :package: 项目的依赖包（请注意版本，急时维护更新文档）

```javascript
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "antd": "^4.11.2",
    "axios": "^0.21.1",
    "pubsub-js": "^1.9.2",		// 观察者模式库的引入
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-redux": "^7.2.2",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "redux": "^4.0.5",
    "redux-saga": "^1.1.3",
    "web-vitals": "^0.2.4"
  },
```

## :sparkles: 新功能

-   :one: 已经发布第二个版本到服务器，请勿修改 master
-   :two: 新的开发任务请从 dev 分支基础上建立分支，再合并到 dev 上，请勿直接合并到 master
-   :three: master 以后只用于发布新版本
-   :four: 增加课程案例组件以及页面，能够进行视频播放、答题等基本功能

## :bug: 未解决 bug

## :pencil: 开发任务

-   :one: 增加课程学习以及能力评价系统相关组件（模仿 mooc）
-   :two: 主页导航栏加入”我的作品“按钮并保持右边的固定导航一致 **子儒**
-   :three: 密码修改功能从模拟到真实接口的改变，需要学习模拟的用法并做好学习文档供其他同学入手**国棠**
-   :four: 用户中心页面样式的优化（从antd组件库添加合适的组件来优化，保持项目风格一致） **翠铷**
-   :five: 用户协议从跳转页面改为弹出式（从antd组件库添加合适的组件来进行改变，完成后删除用户协议页面的内容）**景鑫**

## :octocat: 项目开发者以及联系方式

-   :boy: **李春宇** ：负责项目的整体架构以及项目进度的把握

    -   :mobile_phone_off: 13560511572
    -   :e-mail: 20183231009@m.scnu.edu.cn
    -   :factory: 华南师范大学信息光电子科技学院 2018 级本科生

-   :girl: **沈文淇**：负责网站主页的构造与维护

    -   :mobile_phone_off: 13316062086
    -   :e-mail: 20193232086@m.scnu.edu.cn
    -   :factory: 华南师范大学信息光电子科技学院 2019 级本科生

-   :girl: **孙婧茹**：负责网站其他页面的构造与维护

    -   :mobile_phone_off: 19804150577
    -   :e-mail: 20193231110@m.scnu.edu.cn
    -   :factory: 华南师范大学信息光电子科技学院 2019 级本科生

-   :boy: **苏俊杰**：负责课程学习题目组件的开发
    -   :mobile_phone_off:
    -   :e-mail:
    -   :factory: 华南师范大学信息光电子科技学院 2018 级研究生
