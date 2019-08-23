import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

const state: setStore.stroe = {
  currentIndex: 0,
  musicList: {
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
  }, // 播放数据
  currentAudioIndex: -1, // 当前播放下标
  playState: 0, // 0全部推入播放 1 播放 2 暂停
  playMode: 0 // 0 普通模式 1 单曲 2随机
};

export default new Vuex.Store({
  state, // 存放的数据 状态树
  actions, // 提交中间件提交至methods
  mutations // methods
});
