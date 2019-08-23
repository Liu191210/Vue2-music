import Vue from "vue"
import { Store } from "vuex";
import VueRouter, { Route } from 'vue-router';
declare module 'vue/types/vue' { // 模块补充
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    axios: any;
  }
}
