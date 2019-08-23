<template>
  <div id="musicList">
    <van-popup
      class="song-box"
      :close-on-click-overlay="false"
      v-model="show"
      position="bottom"
      @click-overlay="onEmit"
    >
      <div class="box-top">
        播放列表({{ musicList.data.length }}首)
        <span
          class="iconfont"
          :class="selectIcon[iconIndex].icon"
          @click="onSelect"
        ></span>
      </div>
      <ul>
        <li
          v-for="(item, index) in musicList.data"
          :key="index"
          :class="index === currentAudioIndex ? 'isId' : ''"
        >
          <div class="song-info" @click="onPlay(item)">
            {{ item.details.name }}-
            <span
              class="name"
              :class="index === currentAudioIndex ? 'isId' : ''"
              >{{ item.details.singer }}</span
            >
          </div>
          <i class="cross" @click="onRemove(index)"></i>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Action } from "vuex-class";

Vue.use(window["vant"].Popup);

interface select {
  name: string;
  icon: string;
}

@Component
export default class songList extends Vue {
  @Action spliceMusic!: (params: number) => void;
  @Action nextMusic!: (params: any) => void;
  @Action setPlayMode!: (params: number) => void;
  @Action setCurrent!: (params: number) => void;

  @State musicList!: any;
  @State currentAudioIndex!: number;

  @Prop({ default: false }) readonly show: boolean = false;

  iconIndex: number = 0;
  selectIcon: select[] = [
    {
      name: "列表循环",
      icon: "icon-repeat--fill"
    },
    {
      name: "单曲循环",
      icon: "icon-repeat-one-fill"
    },
    {
      name: "随机循环",
      icon: "icon-allinclusive"
    }
  ];

  onSelect(): void {
    this.iconIndex = this.iconIndex >= 2 ? 0 : ++this.iconIndex;
    let msg: string = this.selectIcon[this.iconIndex].name;
    window["vant"].Toast({
      position: "top",
      message: msg
    });
    this.setPlayMode(this.iconIndex);
  }

  onRemove(index: number): void {
    this.spliceMusic(index);
    if (index < this.currentAudioIndex) {
      // 如果删除前面的
      this.setCurrent(index);
    }
    if (index <= this.currentAudioIndex && this.musicList.data.length > 0) {
      // 是否删除的是当前音乐并且音乐列表还有音乐
      this.nextMusic(this.musicList.data[index]);
    }
  }

  onPlay(item: any): void {
    this.nextMusic(item);
  }

  @Emit()
  onEmit(): void {
    // ... not return value
  }
}
</script>

<style lang="less" scoped>
#musicList {
  .song-box {
    background-color: #fff;
    margin-bottom: 0.5rem;
    width: 100%;
    max-height: 3.5rem;
    .box-top {
      position: relative;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      font-weight: 300;
      font-size: 0.16rem;
      color: #000;
      padding: 0 0.2rem;
      border-bottom: 0.01rem solid rgba(0, 0, 0, 0.08);
      .iconfont {
        float: right;
        font-size: 0.22rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    ul {
      .isId {
        color: #31c27c !important;
      }
      li {
        position: relative;
        height: 0.45rem;
        overflow: hidden;
        padding: 0 0.2rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        font-weight: 300;
        border-bottom: 0.01rem solid rgba(0, 0, 0, 0.08);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        .song-info {
          width: 70%;
          height: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .name {
          font-size: 0.12rem;
          color: #808080;
        }
        .cross {
          position: absolute;
          right: 0.1rem;
          top: 0.125rem;
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
        }
        .cross::after,
        .cross::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          background: rgba(0, 0, 0, 0.8);
          transform: rotate(45deg);
        }
        .cross::before {
          width: 0.17rem;
          height: 0.01rem;
          top: 0.08rem;
        }
        .cross::after {
          width: 0.01rem;
          height: 0.17rem;
          left: 0.08rem;
        }
      }
    }
  }
}
</style>
