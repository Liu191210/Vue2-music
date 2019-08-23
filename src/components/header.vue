<template>
  <header id="header">
    <div class="nav-box root_flex">
      <template v-for="(item, index) in $router.options.routes">
        <router-link
          v-if="item.meta.show"
          :class="{ active: index === currentIndex }"
          class="nav-list"
          :to="item.path"
          :key="index"
          >{{ item.meta.title }}</router-link
        >
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class headers extends Vue {
  @State currentIndex!: number;

  @Action setHeadIndex!: (params: number) => void;;

  @Watch("$route")
  onRouter(item: any): void {
    if (item.meta.show) {
      this.setHeadIndex(item.meta.index);
    }
  }
}
</script>

<style lang="less" scoped>
#header {
  .nav-box {
    background: #ffffff;
    box-orient: horizontal;
    flex-direction: row;
    .nav-list {
      flex: 1;
      position: relative;
      display: block;
      height: 0.4rem;
      line-height: 0.4rem;
      overflow: hidden;
      text-align: center;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 0.6);
    }
    .nav-list.active {
      color: #31c27c;
    }
    .nav-list.active:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.02rem;
      background: #31c27c;
    }
  }
}
</style>
