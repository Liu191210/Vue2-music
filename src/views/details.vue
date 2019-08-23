<template>
  <div id="details">
    <div class="music-top-details root_flex">
      <div class="top-pic">
        <img :src="topPic" />
      </div>
      <h2 class="overflow">{{ listName }}</h2>
      <p class="overflow music_info_text">{{ listName }} 第{{ year }}</p>
      <p class="overflow music_update_time">更新时间: {{ date }}</p>
      <div class="play-music root_flex" @click="allMusic" v-if="playState === 0">全部播放</div>
      <div class="play-music root_flex" @click="setPlay(2)" v-else-if="playState === 1">暂停</div>
      <div class="play-music root_flex" @click="setPlay(1)" v-else>继续</div>
    </div>
    <div class="music-list">
      <h5>排行榜 共{{ songNum }}首</h5>
      <ul>
        <li v-for="(item, index) in songlist" :key="index" @click="append(item)">
          <div class="li_box">
            <div class="song-sort-left">
              <p class="song-index" :class="index < 3 ? 'active' : ''">{{ index + 1 }}</p>
            </div>
            <div class="song-details-rigth">
              <p class="music-name overflow">{{ item.data.songname }}</p>
              <p class="music-author overflow">{{ item.data.singer[0].name }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="details-text">
      <p>榜单简介</p>
      <div class="text" v-html="info"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import mixin from "../assets/ts/mixin";
import { Action, State } from "vuex-class";
interface songlist {
  Franking_value: string;
  cur_count: string;
  data: any[];
  in_count: string;
  old_count: string;
}
@Component({
  mixins: [mixin]
})
export default class Details extends Vue {
  topPic: string = ""; // 头部图片
  listName: string = ""; // 榜名
  songlist: songlist[] = []; // 歌单
  songNum: number = 0; // 歌单数量
  date: string = ""; // 歌单更新时间
  year: string = ""; // 歌单更新天|周
  info: string = ""; // 榜单详情

  @State playState!: number;

  @Action appendMusic!: (params: any) => void;
  @Action pushAll!: (params: any) => void;
  @Action setPlayState!: (params: number) => void;

  getData!: (params: any) => any;

  append(item: any): void {
    let data = this.getData(item.data); // mixn
    this.appendMusic(data); // 添加音乐
    this.setPlayState(1);
  }

  @Watch("$route", { immediate: true })
  onRouter(item: any): void {
    if (!item.query.id) {
      this.$router.go(-1);
    } else {
      this.getList(item.query.id);
    }
  }

  setPlay(num: number): void {
    let audio: HTMLAudioElement | any = document.querySelector("audio");
    this.setPlayState(num);
    num === 1 ? audio.play() : audio.pause();
  }

  allMusic(): void {
    let data: any[] = [];
    for (let i of this.songlist) {
      data.push(this.getData(i.data));
    }
    this.setPlayState(1);
    this.pushAll(data);
  }
  getList(id: string | number): void {
    this.axios
      .get(`/v8/fcg-bin/fcg_v8_toplist_cp.fcg`, {
        topid: id
      })
      .then((res: any) => {
        let name = res.topinfo.ListName;
        name = name.includes("·")
          ? name.slice(name.indexOf("·") + 1) + "榜"
          : name;
        this.topPic = res.topinfo.pic_v12;
        this.listName = name;
        this.songlist = res.songlist;
        this.songNum = res.total_song_num;
        this.date = res.update_time;
        this.info = res.topinfo.info;
        // 判断是否是更新是天榜还是周榜
        this.year = res.day_of_year
          ? `${res.day_of_year}天`
          : `${res.date.substring(
              res.date.indexOf("_") + 1,
              res.date.length
            )}周`;
      })
      .catch((err: any) => {
        window["vant"].fail("排行榜详情获取失败。。。");
      });
  }
}
</script>

<style lang="less">
#details {
  background-color: #f8f8f8;
  p {
    margin: 0;
  }
  .overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .music-top-details {
    width: 100%;
    height: 3.8rem;
    font-size: 0.18rem;
    color: #121212;
    position: relative;
    padding-top: 0.12rem;
    margin-bottom: 0.15rem;
    .top-pic {
      display: block;
      margin-bottom: 0.25rem;
      width: 1.9rem;
      height: 1.9rem;
      border-radius: 0.9rem;
      box-shadow: 0 0.03rem 0.06rem rgba(0, 0, 0, 0.2);
      background-color: #dbdbdb;
      user-select: none;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .music_info_text {
      margin: 0.12rem 0;
      font-size: 0.16rem;
    }
    .music_update_time {
      font-size: 0.14rem;
      color: grey;
    }
    .play-music {
      width: 1.9rem;
      max-height: 0.4rem;
      border-radius: 0.4rem;
      box-shadow: 0 0.03rem 0.16rem rgba(24, 213, 156, 0.5);
      background-color: #22d59c;
      color: white;
      margin-top: 0.12rem;
      margin-bottom: 0.12rem;
    }
  }
  .music-list {
    h5 {
      padding: 0 0.12rem;
      color: gray;
      font-size: 0.12rem;
    }
    li {
      overflow: hidden;
      padding: 0.1rem;
      height: 0.6rem;
      .li_box {
        width: 100%;
        height: 100%;
        display: flex;
      }
      .song-sort-left {
        width: 0.47rem;
        overflow: hidden;
        height: 100%;
        text-align: center;
        line-height: 0.4rem;
        .song-index {
          font-size: 0.14rem;
          color: grey;
        }
        .song-index.active {
          color: #ff400b;
        }
      }
      .song-details-rigth {
        flex: 1;
        width: 80%;
        font-size: 0.14rem;
        color: black;
        .music-author {
          font-size: 0.12rem;
          color: gray;
        }
      }
    }
  }
  .details-text {
    font-size: 0.16rem;
    color: #121212;
    padding: 0.2rem;
    .text {
      margin-top: 0.2rem;
      font-size: 0.12rem;
    }
  }
}
</style>
