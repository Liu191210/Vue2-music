<template>
  <div id="music-container">
    <div class="music-main" v-if="musicList.data.length > 0">
      <div class="music-pic start-flex">
        <img :src="musicList.music.pic" :class="{ rotate: active }" />
      </div>
      <div class="music-info root_flex">
        <audio
          :src="musicList.music.audio"
          id="audio"
          ref="audio"
          preload="metadata"
        ></audio>
        <p class="music-name">{{ musicList.details.name }}</p>
        <p class="music-author">{{ musicList.details.singer }}</p>
      </div>
      <div class="music-btn root_flex">
        <i
          class="iconfont icon-skip-forward-fill root_flex"
          @click="musicEext"
        ></i>
        <i
          @click="onPlayMode"
          class="iconfont root_flex"
          :class="active ? 'icon-play-circle-line' : 'icon-record-circle-fill'"
        ></i>
        <i
          class="iconfont icon-play-list-line root_flex"
          @click="showMusicList"
        ></i>
      </div>
      <div class="music-schedule">
        <p :style="`width:${currentTime}`"></p>
      </div>
    </div>
    <song :show="show" @on-emit="showMusicList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import song from "./musicList.vue";
@Component({
  components: {
    song
  }
})
export default class Music extends Vue {
  active: boolean = true; // 播放
  show: boolean = false; // 显示歌曲列表
  currentTime: string = "0%"; // 当前歌曲进度
  audio: HTMLAudioElement | any = null; //当前播放器

  @State musicList!: any;
  @State currentAudioIndex!: number;
  @State playState!: number;
  @State playMode!: number;

  @Action setPlayMode!: (params: number) => void;
  @Action nextMusic!: (params: any) => void;
  @Action setPlayState!: (params: number) => void;

  @Watch("musicList.data")
  onWatch(val: any): void {
    // 如果没有歌曲
    if (val.length < 1) {
      this.show = false;
      this.setPlayState(0); // 改为全部播放
    } else {
      this.setPlayState(1); // 如果已经有歌曲改变状态为播放
    }
  }
  @Watch("musicList.id")
  onAudio(): void {
    this.$nextTick(() => {
      if (this.musicList.data.length > 0) {
        this.audio = this.$refs.audio as any;
        this.music();
      }
    });
  }

  music(): void {
    this.audio.oncanplay = (): void => {
      // 当可以播放时
      this.audio.play();
      this.setPlayState(1);
    };
    this.audio.ontimeupdate = (): void => {
      // 元素currentTime属性指示的时间已更改 | 正在播放
      this.currentTime =
        ((this.audio.currentTime / this.audio.duration) * 100).toFixed(2) + "%";
    };
    this.audio.onerror = (): void => {
      // 当音乐播放失败
      window['vant'].Toast.fail("音乐加载失败!,可能是接口报废了。。。。");
    };
    this.audio.onended = (): void => {
      // 播放完成
      switch (this.playMode) {
        case 0:
          this.listRepeat();
          break;
        case 1:
          this.repeatOne();
          break;
        default:
          this.random();
      }
    };
  }
  random() {
    // 随机播放
    let index = Math.round(Math.random() * this.musicList.data.length);
    // this.payList.sort(() => Math.random() - 0.5)  乱序
    if (this.musicList.id === this.musicList.data[index].id) {
      this.listRepeat();
    } else {
      this.nextMusic(this.musicList.data[index]);
    }
  }
  repeatOne() {
    // 单曲
    this.audio.load(); // 重新加载
  }
  listRepeat() {
    // 列表
    if (this.musicList.data.length <= 1) {
      this.repeatOne();
    } else {
      let index =
        this.currentAudioIndex >= this.musicList.data.length
          ? 0
          : ++this.currentAudioIndex;
      this.nextMusic(this.musicList.data[index]);
    }
  }

  onPlayMode(): void {
    this.active = !this.active;
    let mode = this.active ? 1 : 2;
    mode === 1 ? this.audio.play() : this.audio.pause();
    this.setPlayMode(mode);
    this.setPlayState(mode);
  }
  musicEext(): void {
    // 下一首
    if (this.musicList.data.length <= 1) {
      window['vant'].Toast("只有一首歌曲!, 重新播放。。。");
      this.audio.currentTime = 0;
    }
    let index = this.currentAudioIndex;
    index >= this.musicList.data.length - 1 ? (index = 0) : index++;
    this.nextMusic(this.musicList.data[index]);
  }
  showMusicList(): void {
    // 点击查看列表 | 点击遮罩层
    this.show = !this.show;
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/icon/iconfont.css");
.music-main {
  height: 0.5rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2333;
  background-color: white;
  box-shadow: -0.08rem 0.08rem 0.12rem 0.04rem #949494;
  border-top: 0.01rem solid rgba(248, 248, 248, 0.5);
  transition: 0.3s ease-out;
  padding: 0 0.2rem;
  display: flex;
  .start-flex {
    flex-direction: column;
    align-self: flex-start;
    display: flex;
    justify-content: center;
  }
  .music-pic {
    width: 0.38rem;
    height: 100%;
    margin-right: 0.15rem;
    overflow: hidden;
    img {
      width: 0.38rem;
      height: 0.38rem;
      border-radius: 50%;
    }
  }
  .music-schedule {
    height: 0.02rem;
    background-color: gray;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 9999 !important;
    p {
      background-color: #31c27c;
      height: 100%;
    }
  }
  .music-info {
    flex: 1;
    font-size: 0.14rem;
    align-items: flex-start;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    width: 1rem;
    p {
      margin: 0;
    }
    .music-author {
      color: #31c27c;
      font-size: 0.12rem;
    }
  }
  .music-btn {
    flex: 1.5;
    flex-direction: row;
    i {
      font-size: 0.26rem;
      flex: 1;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  @keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  .rotate {
    animation: rotate 5s cubic-bezier(0.27, 0.26, 1, 1) infinite;
  }
}
</style>
