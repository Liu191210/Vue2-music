<template>
  <div id="rankingList">
    <ul v-if="topList.length > 0">
      <li v-for="(item, index) in topList" :key="index">
        <router-link
          :to="{ path: '/details', query: { id: item.id } }"
          class="rank_main"
        >
          <div class="rank_float_img">
            <img :src="item.picUrl" />
            <span class="listen_count">
              <i></i>
              {{ item.listenCount }}
            </span>
          </div>
          <div class="rank_list">
            <div class="cont">
              <h3>{{ item.topTitle }}</h3>
              <p v-for="(song, idx) in item.songList" :key="idx">
                {{ idx + 1 }}
                <span>{{ song.songname }}</span>
                -
                {{ song.singername }}
              </p>
            </div>
          </div>
          <i class="arrow"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface songList {
  // 排行榜
  singername: string;
  songname: string;
}
interface topList {
  // 排行榜
  id: number;
  listenCount: number;
  picUrl: string;
  songList: songList[];
  topTitle: string;
  type: number;
}
@Component
export default class rankingList extends Vue {
  topList: topList[] = [];
  created() {
    this.axios
      .get("/v8/fcg-bin/fcg_myqq_toplist.fcg", {})
      .then((res: any) => {
        let start = res.indexOf("(") + 1;
        let data = JSON.parse(res.slice(start, -1));
        this.topList = data.data.topList;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>

<style lang="less">
#rankingList {
  background-color: #f4f4f4;
  .arrow {
    position: absolute;
    right: 0.1rem;
    top: 50%;
    margin-top: -0.04rem;
    width: 0.06rem;
    height: 0.06rem;
    border-right: 0.01rem solid #b2b2b2;
    border-bottom: 0.01rem solid #b2b2b2;
    transform: rotate(-45deg);
  }
  ul {
    padding: 0.1rem;
    li {
      overflow: hidden;
      margin-bottom: 0.1rem;
      .rank_main {
        display: -webkit-box;
        background: #ffffff;
        position: relative;
        .rank_float_img {
          width: 1rem;
          height: 1rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          ::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.1);
          }
          .listen_count {
            height: 0.12rem;
            bottom: 0.07rem;
            left: 0.05rem;
            line-height: 0.12rem;
            position: absolute;
            display: block;
            z-index: 10;
            color: white;
            font-size: 0.12rem;
            i {
              display: block;
              float: left;
              width: 0.1rem;
              height: 0.1rem;
              background-position: 0 -0.5rem;
              margin-right: 0.05rem;
              background-image: url(../assets/images/list_sprite.png);
              background-repeat: no-repeat;
              background-size: 0.24rem 0.6rem;
            }
          }
        }
        .rank_list {
          position: relative;
          -webkit-box-flex: 1;
          display: -webkit-box;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          .cont {
            -webkit-box-flex: 1;
            margin: 0 0.1rem 0 0.15rem;
            h3 {
              color: black;
              font-size: 0.16rem;
              font-weight: normal;
              margin-bottom: 0.05rem;
            }
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: rgba(0, 0, 0, 0.5);
              font-size: 0.14rem;
              margin-bottom: 0.05rem;
              span {
                color: #000;
                margin-left: 0.08rem;
                margin-right: 0.05rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
