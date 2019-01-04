// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 路由/vuex
import router from './router'
import store from './store'

// 第三方插件/库
import MintUI, { InfiniteScroll, Lazyload, Popup, Range } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueProgressBar from 'vue-progressbar'
const options = {
  color: 'rgb(143, 255, 199)',
  failedColor: '#ff0000',
  thickness: '2px',
  autoRevert: true
}

// 淘宝适配库/重置css
import './assets/js/flexible.min.js'
import './assets/css/app.css'


Vue.use(MintUI,InfiniteScroll,Lazyload, Popup, Range)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar, options)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
