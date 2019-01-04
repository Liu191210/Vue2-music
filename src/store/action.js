import { Toast } from 'mint-ui'
export default {
	tabNum(state, num) { // header切换
		state.state.num = num
	},
	remove(state, index) {  // 删除搜索列表 
		state.state.searchList.splice(index, 1)
	},
	addlist(state, val) { // 搜索列表添加
		if (state.state.searchList.find((i) => i === val)) {  // 方法只返回符号条件的第一个值 也可以替换为new set去重来替换
			return false
		}
		state.state.searchList.push(val)
	},
	setAudio(state, jsonp) {  // 添加到歌单
		if (state.state.payList.find((i) => i.Audio.id === jsonp.Audio.id)) { // 如果歌单里面有了 
			Toast('已经在歌单里了(ˉ▽ˉ；)...')
			return false
		}
		state.state.payList.push(jsonp) // 插入播放列表
		if(state.state.Audio.id === null){ // 如果当前没有音乐播放则插入播放
			state.state.Audio.id = jsonp.Audio.id
			state.state.Audio.data[0] = jsonp
		}
		Toast({
			message: '添加成功',
			duration: 500
		});
	},
	setEle (state, el) { // 绑定元素
		state.state.Audio.el = el
	},
	setPlay(state, i){ // 播放状态
		state.state.Audio.play = i
	},
	setMode(state, val){ // 播放模式
		state.state.payMode = val
	},
	splicePayList(state, index){ // 删除播放列表
		Toast({
			message: '删除成功',
			position: 'top',
			duration: 1000
		})
		state.state.payList.splice(index, 1)
	},
	newPlay(state, val){ // 删除切换/切换 音乐
		state.state.Audio.data[0] = val
		state.state.Audio.id = val.Audio.id
	},
	Info(state){ // 重置
		state.state.payList.splice(0, state.state.payList.length)
		state.state.Audio.data.splice(0, state.state.Audio.data.length)
		state.state.Audio.id = null
		state.state.Audio.play = null
	},
	setPayIndex(state, index){
		state.state.payIndex = index
	},
	ForNew(state, val){ // 列表插入
		for(let [i,e] of val.entries()){
			state.state.payList.push(e)
		}
		if(state.state.Audio.id === null){ // 如果当前没有音乐播放则插入播放
			state.state.Audio.id = val[0].Audio.id
			state.state.Audio.data[0] = val[0]
		}
		Toast({
			message: '添加成功',
			duration: 500
		});
	},
	arrSet(state, arr){ // 判断列表是否添加过了
		state.state.queryId.push(arr)
		state.state.queryId = [...new Set(state.state.queryId)]
	},
	setCurrentTime (state, time) {
		state.state.currentTime = time
	},
	setDuration (state, time) {
		state.state.duration = time
	}
}