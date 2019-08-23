# vue3重构vue2-qq-music

###  本实例只是用来开发玩玩，第一次踩ts的坑

## 技术栈
1. [vue-cli](https://cli.vuejs.org/zh/)、[vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)、 [vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)
2. [axios（请求库）](https://github.com/axios/axios)
3. [Vant（轻量、可靠的移动端 Vue 组件库,支持ts）](https://youzan.github.io/vant/#/zh-CN/intro)
7. [typeScript (语法为es6/7)](https://www.tslang.cn/)
8. [less（css预处理器）](https://github.com/less/less-docs)


## 目录结构

``` bash
├── public
├── src
│   ├── assets                   // 静态资源
│   |   ├── css                  // css
│   |   ├── images               // 图片
│   |   ├── ts                   // 一些js => mixins
│   ├── components               // 全局组件
│   ├── views                    // page
│   ├── request                  // 用Promise封装的aoios
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── types                    // ts、vue模块补充
│   ├── App.vue
│   └── main.js                  // 项目依赖
├── .env                         // 环境配置文件              
├── tsconfig.json                // ts配置  
└── vue.config                   // vue 全局配置
```

## 待改进和待添加

* 复用details组件
* 把一些页面上的东西封装成组件
* history模式刷新404 ----> 替换成hast模式
* 主页热门歌单or电台没有


## 安装运行

``` bash
# 安装依赖
npm install

# 启动项目(默认环境)
npm run serve 

# 运行
http://localhost:7777

# 打包项目
npm run build
```

## 其他声明

* 一些API来源于(https://github.com/messoer)
