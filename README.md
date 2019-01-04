#  Music(模拟QQ音乐)

## 技术栈
1. [vue](https://cn.vuejs.org/v2/guide/)、 [vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)、 [vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)
2. [axios（请求库）](https://github.com/axios/axios)
3. [mint-ui（饿了么移动端UI库）](http://mint-ui.github.io/docs/#/zh-cn2)
4. [amfe-flexible（淘宝适配库）](https://github.com/amfe/lib-flexible)
7. [ES6/7（JS语法）](https://github.com/lukehoban/es6features)
8. [ESlint（JS语法规范）](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)  
8. [less（css预处理器）](https://github.com/less/less-docs)

## 提示

- 在谷歌浏览器后面添加 --args --disable-web-security --user-data-dir 并重启


##  待添加功能/页面

- [x] 音乐详情页
- [x] 歌词映射
- [ ] jsonp跨域,原生创建script模拟jsonp跨域成功但是报错

##  已知错误

- 音乐自动切换的时候报: Uncaught (in promise) DOMException: The play() request was interrupted by a new load request
- 数据返回正确但读取错误: 专辑图片/歌曲 读取错误  // 已做处理

## 目录结构

``` bash
├── src                          
│   ├── assets                   // 静态资源
│   |   ├── css                  // css重置bootstrap4.0整理下来的
│   |   ├── images               // 图片
│   |   ├── js                   // 淘宝rem适配库
│   ├── components               // 全局组件
│   |   |── header               // 头部导航
│   |   |── music                // 播放器
│   |   |── song                 // 播放歌单  
│   |   |—— songDetails          // 歌曲详情
│   ├── page                   
│   |   ├── home                 // 主页
│   |   ├── ranking              // 排行榜
│   |   ├── search               // 搜索框
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── utils                   
│   |   ├── api.js               // 请求api
│   |   ├── request.js           // 请求方法配置
│   ├── App.vue
│   └── main.js                   // 项目依赖
├── package.json                 
└── vue.config.js               
```

## 安装运行

``` bash
# 安装依赖
npm install

# 启动项目
npm run dev

# 运行
http://localhost:8080

# 打包项目
npm run build
```
