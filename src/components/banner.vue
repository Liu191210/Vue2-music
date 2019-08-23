<template>
  <section id="banner">
    <van-swipe :autoplay="3000" :show-indicators="true" indicator-color="#fff">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image.picUrl" />
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
Vue.use(window["vant"].Swipe).use(window["vant"].SwipeItem);
@Component
export default class banner extends Vue {
  @Prop() readonly banner: string[] | undefined;
}
</script>

<style lang="less">
#banner {
  width: 100%;
  overflow: hidden;
  height: 1.44rem;
  position: relative;
  margin-bottom: 0.14rem;
  .van-swipe-item {
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-swipe__indicators {
    i {
      width: 0.08rem;
      height: 0.08rem;
      display: inline-block;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      margin: 0 0.04rem;
    }
  }
}
</style>
