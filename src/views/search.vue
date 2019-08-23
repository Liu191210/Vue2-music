<template>
  <div id="search">
    <div class="top-search-input">
      <form action="/">
        <van-search
          v-model.trim="search"
          placeholder="搜索歌曲、歌单、专辑"
          :show-action="showAction"
          class="search_input"
          autocomplete="off"
          autocorrect="off"
          @search="onKeyword"
          @cancel="onCancel"
          @clear="onClear"
          @focus="onFocus"
        />
      </form>
    </div>
    <div class="recommend-song-list" v-if="recommendState">
      <h5>热门搜索</h5>
      <div class="search_list" v-if="hotkey.length > 0">
        <a href="javascript:;" class="keyword">{{ specialKey }}</a>
        <div
          class="keyword"
          v-for="(item, index) in hotkey"
          :key="index"
          @click="onkeywordItem(item.k)"
        >{{ item.k }}</div>
      </div>
      <div
        class="get-recommend-list"
        v-else
        @click="getList">重新获取</div>
    </div>
    <div class="search-keyword-list" v-if="KeywordState">
      <ul>
        <li v-for="(item, index) in searchKeywordList" :key="index">
          <div class="searchList_main">
            <span class="clok"></span>
            <span class="rech_con" @click="onKeyword(item)">{{ item }}</span>
            <span class="del_ok" @click="removeItem(index)"></span>
          </div>
        </li>
      </ul>
      <div 
        class="clear_btn"
        @click="clearSearchKeyword"
        v-if="searchKeywordList.length > 0">清除记录</div>
    </div>
    <div class="music-list" v-if="musicState">
      <div class="search-content">
        <ul>
          <li v-for="(item, index) in searchMusicList" :key="index" @click="append(item)">
            <i></i>
            <h6>{{ item.songname }}</h6>
            <p>{{ item.singer[0].name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import mixin from "@/assets/ts/mixin";

Vue.use(window["vant"].Search);

interface hotkey {
  k: string;
  n: number;
}

@Component({
  mixins: [mixin]
})
export default class search extends Vue {
  search: string = ""; // 关键词
  showAction: boolean = false; // 取消按钮显示状态
  specialKey: string = ""; // 特别的热门搜索词
  hotkey: hotkey[] = []; // 热门搜索
  searchKeywordList: Array<any> = []; // 搜索记录
  searchMusicList: object[] = []; // 搜索歌曲列表
  recommendState: boolean = true; // 热门显示状态
  KeywordState: boolean = false; // 历史搜索显示状态
  musicState: boolean = false; // 搜索歌曲列表显示状态

  @Action appendMusic!: (params: any) => void;
  @Action setPlayState!: (params: number) => void;

  getData!: (params: any) => any;

  append(item: any): void {
    let data = this.getData(item); // mixn
    this.appendMusic(data); // 添加音乐
    this.setPlayState(1);
  }
  onCancel(): void {
    // 点击input取消
    this.setShowState(false, true, false);
    this.showAction = false;
  }
  onClear(): void {
    // 清空input
    this.setShowState(true, false, false);
  }
  onFocus(): void {
    // input聚焦
    this.showAction = true;
    if (this.searchMusicList.length > 0) {
      return;
    }
    this.setShowState(true, false, false);
  }
  setShowState(Keyword: boolean, recommend: boolean, music: boolean) {
    // 显示状态
    this.KeywordState = Keyword;
    this.recommendState = recommend;
    this.musicState = music;
  }
  onkeywordItem(keyword: string): void {
    // 点击一条历史搜索记录
    this.onKeyword(keyword);
    this.showAction = true;
  }
  onKeyword(keyword: string): void {
    // 搜索音乐列表
    this.setShowState(false, false, true);
    let trim: string = keyword.trim();
    this.search = trim;
    this.searchKeywordList.push(trim);
    this.searchKeywordList = [...new Set(this.searchKeywordList)];
    this.axios
      .get("/soso/fcgi-bin/client_search_cp", {
        w: trim
      })
      .then((res: any) => {
        let start: number = res.indexOf("(") + 1;
        let data = JSON.parse(res.slice(start, -1));
        this.searchMusicList = data.data.song.list;
      })
      .catch((err: any) => {
        window["vant"].Toast.fail("搜索失败，请稍后再试!");
      });
  }
  removeItem(index: number): void {
    // 删除这条搜索内容
    this.searchKeywordList.splice(index, 1);
  }
  clearSearchKeyword(): void {
    // 清空历史搜索列表
    this.searchKeywordList = [];
  }
  getRandomKeyword(special: hotkey[]): hotkey[] {
    // 获取随机6个组成的热门搜索词
    let data: hotkey[] = [];
    let key = 6;
    for (let i = 0; i < key; i++) {
      let id = Math.round(Math.random() * special.length - 1) + 1;
      let item = special[id];
      if (data.find(x => x.k === item.k)) {
        key++;
        continue;
      }
      data.push(item);
    }
    return data;
  }
  getList(): void {
    this.axios
      .get("/splcloud/fcgi-bin/gethotkey.fcg", {})
      .then((res: any) => {
        // 获取热门搜索词
        this.hotkey = this.getRandomKeyword(res.data.hotkey);
        this.specialKey = res.data.special_key;
      })
      .catch((err: any) => {
        window["vant"].Toast.fail("热门搜索词加载失败!");
      });
  }
  created() {
    this.getList();
  }
}
</script>

<style lang="less">
#search {
  .top-search-input {
    .van-search {
      background-color: #f4f4f4 !important;
      .van-search__content {
        background: white;
      }
    }
  }
  .recommend-song-list {
    background: #fff;
    padding: 0.15rem;
    padding-bottom: 0.1rem;
    color: rgba(0, 0, 0, 0.6);
    h5 {
      font-size: 0.12rem;
      margin-bottom: 0.08rem;
    }
    .search_list {
      a {
        color: #fc4524;
        border-color: #fc4524;
      }
    }
    .keyword {
      display: inline-block;
      font-size: 0.14rem;
      padding: 0 0.1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #000;
      border: 0.01rem solid rgba(0, 0, 0, 0.6);
      border-radius: 0.2rem;
      word-break: keep-all;
      margin-bottom: 0.1rem;
      margin-right: 0.14rem;
    }
  }
  .search-keyword-list {
    background-color: white;
    li {
      border-top: 0.01rem solid #ededed;
      padding: 0 0.15rem;
    }
    .searchList_main {
      position: relative;
      display: block;
      height: 0.44rem;
      line-height: 0.44rem;
      .clok {
        position: absolute;
        left: 0;
        top: 0.12rem;
        width: 0.2rem;
        height: 0.2rem;
        background: url(../assets/images/clock_ic.png) no-repeat;
        background-size: cover;
        text-indent: -10rem;
      }
      .rech_con {
        position: absolute;
        left: 0.4rem;
        right: 0.5rem;
        display: block;
        height: 0.44rem;
        line-height: 0.44rem;
        color: #000;
        font-size: 0.14rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .del_ok {
        position: absolute;
        right: 0;
        top: 0.12rem;
        width: 0.2rem;
        height: 0.2rem;
      }
      .del_ok::after,
      .del_ok::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        background: rgba(0, 0, 0, 0.6);
        transform: rotate(45deg);
      }
      .del_ok::before {
        width: 0.17rem;
        height: 0.01rem;
        top: 0.08rem;
      }
      .del_ok::after {
        width: 0.01rem;
        height: 0.17rem;
        left: 0.08rem;
      }
    }
    .clear_btn {
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      color: #47c88a;
      font-size: 0.14rem;
    }
  }
  .search-content {
    li {
      position: relative;
      height: 0.55rem;
      padding-left: 0.56rem;
      overflow: hidden;
      font-size: 0.12rem;
      border-bottom: 0.01rem solid #e5e5e5;
      i {
        position: absolute;
        top: 0.18rem;
        left: 0.18rem;
        width: 0.22rem;
        height: 0.2rem;
        background: url(../assets/images/search_sprite.png) no-repeat;
        background-size: 0.22rem 0.3rem;
      }
      h6 {
        margin: 0.1rem 0 0.02rem;
        line-height: 0.18rem;
        font-size: 0.14rem;
        color: #000;
        font-weight: 300;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        width: 95%;
      }
      p {
        color: #808080;
      }
      span {
        position: absolute;
        top: 0.08rem;
        left: 0.08rem;
        width: 0.4rem;
        height: 0.4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
