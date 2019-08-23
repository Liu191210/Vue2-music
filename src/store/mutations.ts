import { MutationTree } from "vuex";
const mutations: MutationTree<any> = {
  SETHEADINDEX(store, index): void {
    // 记录当前头部导航位置
    store.currentIndex = index;
  },
  APPENDMUSIC(store, music): void {
    // 添加音乐
    let add = store.musicList.data.some((i: any) => i.id === music.id); // 已经存在该歌曲？
    if (!add) {
      store.musicList.data.push(music);
      window.vant.Toast.success("添加成功");
    }
    if (!store.musicList.id || add) {
      // 是否第一次点击添加歌曲 | 已经存在该歌曲
      this.commit("NEXTMUSIC", music);
    }
  },
  SPLICEMUSIC(store, index): void {
    // 删除音乐
    store.musicList.data.splice(index, 1);
    if (store.musicList.data < 1) {
      // 重置
      store.currentAudioIndex = -1;
      store.musicList = {
        id: "",
        data: [],
        details: {
          name: "",
          singer: ""
        },
        music: {
          audio: "",
          pic: ""
        }
      };
    }
  },
  SETCURRENT(store, index): void {
    // 设置当前高亮音乐列表项
    store.currentAudioIndex = index;
  },
  NEXTMUSIC(store, { id, details, music }): void {
    // 下一首音乐
    store.musicList.id = id;
    store.musicList.details = details;
    store.musicList.music = music;
    let index = store.musicList.data.findIndex(
      (i: any) => i.id === store.musicList.id
    ); // 找当前歌曲位置
    this.commit("SETCURRENT", index);
  },
  PUSHALLMUSIC(store, music): void {
    // 全部添加
    store.musicList.data.push(...music);
    if (!store.musicList.id) {
      // 如果没有播放音乐
      this.commit("NEXTMUSIC", music[0]);
    }
  },
  SETPLAYSTATE(store, state): void {
    // 播放状态
    store.playState = state;
  },
  SETPLAYMODE(store, state): void {
    // 播放模式
    store.playMode = state;
  }
};
export default mutations;
