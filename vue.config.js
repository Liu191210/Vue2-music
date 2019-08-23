const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};
const srcipt = [
  // cdn加载
  // https://www.bootcdn.cn/  CDN网站
  "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
  "https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js",
  "https://cdn.bootcss.com/axios/0.19.0/axios.min.js",
  "https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js",
  "https://cdn.jsdelivr.net/npm/vant@2.0/lib/vant.min.js"
];
// https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
// https://cli.vuejs.org/zh/guide/html-and-static-assets.html#html
module.exports = {
  publicPath: "/",
  outputDir: "dist", // 不同的环境打不同包名
  assetsDir: "static", // 放置生成的静态资源的一个目录
  productionSourceMap: false, // 生成环境不需要.map文件 加速生产环境构建
  chainWebpack: config => {
    // 修改 html-webpack-plugin
    // https://github.com/jantimon/html-webpack-plugin#options
    // https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9
    config.plugin("html").tap(args => {
      args[0].title = "music"; // title
      args[0].srcipt = srcipt;
      args[0].favicon = "src/assets/images/favicon.ico"; // title旁边icon小图
      return args; /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    });
    // 链式操作  https://github.com/neutrinojs/webpack-chain
    // 设置别名为了让后续引用的地方减少路径的复杂度
    config.resolve.alias
      .set("@c", resolve("src/components"))
      .set("@v", resolve("src/views"))
      .set("@a", resolve("src/assets"));
  },
  // https://github.com/survivejs/webpack-merge
  // https://webpack.docschina.org/configuration/externals/
  // 防止将某些 import 的包打包，在运行时再去从外部获取这些扩展依赖
  configureWebpack: config => {
    // 设置外部载入
    config.externals = {
      vue: "Vue",
      vuex: "Vuex",
      axios: "axios",
      "vue-router": "VueRouter"
    };
  },
  devServer: {
    // 配置 https://webpack.js.org/configuration/dev-server/#devserverhotonly
    compress: true, // gzip压缩
    open: true, // 运行后自动打开
    port: "7777", // 端口
    host: "localhost", // host
    // proxy: process.env.VUE_APP_BASE_URL
    proxy: {
      // 配置多个代理   现在请求将请求代理到的请求
      // 设置代理 具体文档 https://cli.vuejs.org/zh/config/#devserver-proxy
      "/": {
        target: process.env.VUE_APP_BASE_URL, // 请求目标地址
        changeOrigin: false, // 虚拟主机站点
        ws: false // 支持跨域
      }
    }
  }
};
