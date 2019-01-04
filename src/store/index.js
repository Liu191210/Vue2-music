import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'

Vue.use(Vuex)

const state = {
  index_list: {}, // 主业列表
  searchList: [], // 搜索列表
  num: 0, // 导航
  Audio:{  
  	el: null, // 当前元素
  	id: null, // 当前播放id 用来对比
  	data: [], // 播放数据
  	play: null, // audio播放状态 0停止 1播放 
  },
  payIndex: null, // 播放位置
  payList: [], // 列表
  payMode: 0, //  0列表  1单曲 2随机 
  queryId: [], // 判断全部播放是否已经插入过列表了
  currentTime: null,
  duration: null
}

export default new Vuex.Store({
  state,
  actions
})
