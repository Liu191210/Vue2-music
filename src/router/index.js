import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'

Vue.use(Router)
// webpack的 require.ensure 路由懒加载
// https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
// const home = () => import('@/page/home/index')
const home = r => require.ensure([], () => r(require('@/page/home/index')), 'home')
const songDetails = r => require.ensure([], () => r(require('@/components/songDetails')), 'songDetails')
const ranking = r => require.ensure([], () => r(require('@/page/ranking/index')), 'ranking')
const search = r => require.ensure([], () => r(require('@/page/search/index')), 'search')
const topList = r => require.ensure([], () => r(require('@/page/ranking/topList')), 'topList')

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [{ // 地址为空时跳转home页面
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/ranking',
      component: ranking
    },
    {
      path: '/topList',
      component: topList
    },{
      path: '/songDetails',
      component: songDetails
    }]
  }],
 /* scrollBehavior (to, form, savedPosition) {
   scrollBehavior方法接收to，form路由对象,第三个参数savedPosition当且仅当在浏览器前进后退按钮触发时才可用
   * 该方法会返回滚动位置的对象信息，如果返回false，或者是一个空的对象，那么不会发生滚动
   * 我们可以在该方法中设置返回值来指定页面的滚动位置:
   * return {x:0,y:0}
   * 表示在用户切换路由时让是所有页面都返回到顶部位置 
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }*/
})
