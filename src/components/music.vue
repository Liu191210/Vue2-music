<template>
<div id="musicContainer" v-if="payList.length !== 0">
	<div class="music-box">
		<audio  autoplay="autoplay" :src="Audio.data[0].Audio.dataUrl"  ref="_audio" id="audio"></audio>
		<div class="musicImag_box root_flex">
			<router-link to="songDetails" class="rank_main">
			<img :src="Audio.data[0].Audio.pic" class="music_image" :class="Audio.play === 1 ? 'rotate' : ''"/>
			</router-link>
		</div>
		<div class="musicInforMation root_flex">
			<div class="music_name">{{ Audio.data[0].Details.name}}</div>
			<div class="musciauthor">{{ Audio.data[0].Details.singer }}</div>
		</div>
		<div class="musicBtn">
			<div class="btn_next f1">
				<i @click="addnum"></i>
			</div>
			<div class="btn_start_end f1">
				<i @click="startEnd(1)" v-if="Audio.play === 0"></i>
				<i @click="startEnd(0)" v-else style="background-position: 0 -.31rem"></i>
			</div>
			<div class="btn_music_list f1">
				<i @click="$refs.Pay.toggleStates()"></i>
			</div>
		</div>
	</div>
	<div class="music_schedule">
		<p :style="`width:${audioTime}`"></p>
	</div>
	<Pay ref="Pay"></Pay>
	<div class="mint-toast"></div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import Pay from './song.vue'
export default {
	data() {
		return {
			audioTime: '0%'
		}
	},
	computed: {
		...mapState([
			'payList',
			'Audio',
			'payMode',
			'payIndex',
			'time'
		]),
	},
	watch: {
		'payList'(val) {
			if(val) {
				this.$nextTick(() => {
					this.audioInfo()
				})
			}
		},
	},
	methods: {
		...mapActions([
			'setPlay', 'newPlay',
			'setPayIndex', 'setEle',
			'setCurrentTime', 'setDuration',
			'splicePayList'
		]),
		audioInfo() {
			let _audio = this.$refs._audio
			if(this.payList.length === 0) { // 防止清空触发
				return false
			}
			this.setEle(_audio)
			_audio.oncanplay = () => {
				_audio.play();
				this.setDuration(parseInt(_audio.duration))
				let index = this.payList.findIndex((e) => e.Audio.id === this.Audio.id)
			  this.setPayIndex(index)
			}
			_audio.ontimeupdate = () => { // bug有时候保存操作之后不会进入这里造成进度条没了 
				this.setCurrentTime(~~_audio.currentTime)
				this.audioTime = parseInt((_audio.currentTime /_audio.duration) * 100) + "%";
			}
			_audio.onplay = () => {
				this.setPlay(1)
			}
			_audio.onpause = () => {
				this.setPlay(0)
			}
			_audio.onerror = () => { // 当音乐播放失败 
				Toast({
					message: '播放失败，正在切换中。。。。',
					duration: 500
				});
				this.splicePayList(this.payIndex+1)
			  this.newPlay(this.payList[this.payIndex+1])
			}
			_audio.onended = () => { 
				this.setPlay(0)
				switch(this.payMode) {
					case 0:
						this.listRepeat()
						break;
					case 2:
						this.randmo()
						break;
					case 1:
						this.repeatone()
						break;
				}
			}
		},
		addnum(){
			let index = this.payIndex;
			index === this.payList.length - 1 ? index = 0 : index++
			if(this.payList[index].Audio.id === this.Audio.id){
				Toast({
				  message: '已经在播放啦 (￣_￣|||)',
				  position: 'top',
				  duration: 1000
				});
				return 
			}
			Toast({
				message: '切换中...',
				duration: 500
			});
			this.newPlay(this.payList[index])
		},
		randmo() { // 随机播放
			console.log('随机播放')
			let index = ~~(Math.random() * this.payList.length)
			// this.payList.sort(() => Math.random() - 0.5)  乱序
			if(this.payList[index].Audio.id === this.Audio.id) {
				this.listRepeat()
			} else {
				this.newPlay(this.payList[index])
				this.$refs._audio.play()
			}
		},
		repeatone() { // 单曲
			console.log('单曲')
			this.$refs._audio.load()
			this.$refs._audio.play()
		},
		listRepeat() { // 列表	
			console.log('列表')
			let index = this.payIndex;
			index === this.payList.length - 1 ? index = 0 : index++
			if(this.payList.length <= 1) {
				this.repeatone()
			} else {
				this.newPlay(this.payList[index])
				this.$refs._audio.play()
			}
		},
		startEnd(e) {
			e === 1 ? this.$refs._audio.play() : this.$refs._audio.pause()
			this.setPlay(e)
		}
	},
	components: {
		Pay
	}
}
</script>

<style lang="less">
#musicContainer .music-box {
	width: 100%;
	height: .5rem;
	overflow: hidden;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999999 !important;
	background-color: white;
	border-top: 1px solid #F4F4F4;
	.musicImag_box {
		width: .38rem;
		height: 100%;
		float: left;
		margin: 0 .1rem;
		overflow: hidden;
		.music_image {
			width: 100%;
			height: .38rem;
			border-radius: 50%;
		}
	}
	.musicInforMation {
		height: 100%;
		width: 40%;
		text-align: left;
		align-items: flex-start;
		font-weight: 300;
		font-size: 14px;
		color: black;
		overflow: hidden;
		text-align: center;
		white-space: nowrap;
		float: left;
		.musciauthor {
			margin-top: .05rem;
			color: #31c27c;
			font-size: 12px;
		}
	}
	.musicBtn {
		float: right;
		height: 100%;
		width: calc((100% - .58rem) - 40%);
		display: flex;
		.btn_start_end {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				display: block;
				width: .3rem;
				height: .3rem;
				background-position: 0 0;
				background-image: url(../assets/images/list_sprite.png);
				background-repeat: no-repeat;
				background-size: .3rem;
				border-radius: 50%;
			}
		}
		.btn_next {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				display: flex;
				justify-content: center;
				align-items: center;
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				border: 1px solid rgba(0, 0, 0, .5);
			}
			i:before {
				content: " ";
				display: block;
				height: 0;
				width: 0;
				border-color: transparent transparent transparent rgba(0, 0, 0, .5);
				border-width: .07rem .11rem;
				border-style: solid;
				border-radius: 2px;
				margin-right: -.1rem;
			}
			i:after {
				content: "";
				height: .14rem;
				width: .02rem;
				background-color: rgba(0, 0, 0, .5);
			}
		}
		.btn_music_list {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				display: flex;
				justify-content: center;
				align-items: center;
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				border: 1px solid rgba(0, 0, 0, .5);
			}
			i:before {
				content: " ";
				display: block;
				width: .22rem;
				height: .22rem;
				background: url(../assets/images/musiclist.png) no-repeat;
				background-size: .22rem;
			}
		}
	}
}
#musicContainer {
	.music_schedule {
		height: .02rem;
		background-color: #808080;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99999999 !important;
		p {
			width: 0;
			height: 100%;
			background-color: #31C27C;
			transition: .2s;
		}
	}
	@keyframes rotate {
		from {
			-webkit-transform: rotate(0deg)
		}
		50% {
			-webkit-transform: rotate(180deg)
		}
		to {
			-webkit-transform: rotate(360deg)
		}
	}
	.rotate {
		-webkit-animation: rotate 5s cubic-bezier(0.27, 0.26, 1, 1) infinite;
	}
}
</style>