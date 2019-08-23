import Router, { RouteConfig } from "vue-router";
const routes: RouteConfig[] = [
  {
    path: "/index",
    alias: "/",
    meta: {
      title: "推荐",
      name: "index",
      index: 0,
      show: true
    },
    component: () => import("@v/index.vue")
  },
  {
    path: "/ranking",
    meta: {
      title: "排行榜",
      name: "ranking",
      index: 1,
      show: true
    },
    component: () => import("@v/rankingList.vue")
  },
  {
    path: "/search",
    meta: {
      title: "搜索",
      name: "search",
      index: 2,
      show: true
    },
    component: () => import("@v/search.vue")
  },
  {
    path: "/details",
    meta: {
      title: "详情",
      name: "details",
      show: false
    },
    component: () => import("@v/details.vue")
  }
];

export default new Router({
  mode: "history",
  routes
});
