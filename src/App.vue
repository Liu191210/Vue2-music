<template>
  <div id="app" :class="{ padding: musicList.data.length > 0 }">
    <header-list />
    <router-view />
    <music />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import headerList from "@c/header.vue";
import music from "@c/music.vue";
@Component({
  components: {
    "header-list": headerList,
    music
  }
})
export default class APP extends Vue {
  @State musicList: any;
}
</script>

<style lang="less">
.padding {
  padding-bottom: 0.5rem;
}
</style>
