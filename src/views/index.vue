<template>
  <div id="index">
    <banner :banner="banner" />
    <div class="song-list">
      <div class="mod-list" v-for="(item, index) in musicSong" :key="index">
        <h2>{{ index === "radioList" ? "电台" : "热门歌单" }}</h2>
        <ul>
          <li class="music-list" v-for="(song, ids) in item" :key="ids">
            <div class="contnet-box">
              <div class="list_media">
                <img :src="song.picUrl" />
                <span class="play"></span>
              </div>
              <div class="list_info">
                <h3>{{ song.Ftitle || song.songListDesc }}</h3>
                <p v-if="index === 'songList'">{{ song.songListAuthor }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="footer_logo"></div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import banner from "@c/banner.vue";
interface musicList {
  // 主页 热歌、电台
  radioList: string[];
  songList: string[];
}
@Component({
  components: {
    banner
  }
})
export default class index extends Vue {
  banner: string[] = [];
  musicSong: musicList = {
    radioList: [],
    songList: []
  };
  created() {
    const toast: any = window["vant"].Toast.loading({
      mask: true,
      message: '加载中...',
      forbidClick: true
    });
    this.axios
      .get("/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg", {})
      .then((result: any) => {
        toast.clear();
        this.banner = result.data.slider;
        this.musicSong.radioList = result.data.radioList;
        this.musicSong.songList = result.data.songList;
      });
  }
}
</script>

<style lang="less">
#index {
  background-color: #f4f4f4;
  .song-list {
    padding: 0 0.1rem 0.07rem 0.1rem;
    h2 {
      font-size: 0.16rem;
      color: #000;
      margin-bottom: 0.11rem;
      font-weight: 400;
    }
    ul {
      overflow: hidden;
      margin-right: -0.08rem;
      li {
        width: 50%;
        float: left;
        padding-right: 0.08rem;
        margin-bottom: 0.1rem;
        overflow: hidden;
        height: 100%;
        .contnet-box {
          display: block;
          background-color: white;
          .list_media {
            position: relative;
            margin-bottom: 0.05rem;
            img {
              width: 100%;
            }
            .play {
              height: 0.24rem;
              bottom: 0.05rem;
              right: 0.05rem;
              width: 0.24rem;
              background-position: 0 0;
              background-image: url(../assets/images/list_sprite.png);
              background-repeat: no-repeat;
              background-size: 0.24rem 0.6rem;
              position: absolute;
              display: block;
              z-index: 10;
            }
          }
        }
        .list_info {
          padding: 0 0.07rem 0.05rem;
          color: #000000;
          display: block;
          width: 100%;
          h3 {
            font-size: 0.14rem;
            height: 0.36rem;
            line-height: 0.18rem;
            white-space: normal;
            word-wrap: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: normal;
          }
          p {
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
  footer {
    padding: 0.15rem 0;
    text-align: center;
    position: relative;
    font-size: 0.14rem;
    color: #000000;
    .footer_logo {
      width: 0.82rem;
      height: 0.24rem;
      margin: 0.2rem auto 0.1rem;
      background: url(../assets/images/logo_footer.png) no-repeat center;
      background-size: cover;
    }
  }
}
</style>
