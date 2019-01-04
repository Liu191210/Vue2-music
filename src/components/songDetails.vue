<template>
	<div id="songDetails">
		<!-- @touchstart.stop.prevent="touchStart"  @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd"-->
		<article>
			<section id="author">
				<div class="songname">{{ Audio.data[0].Details.name }}</div>
				<div class="name">{{ Audio.data[0].Details.singer }}</div>
			</section>
			<div id="lyricsList">
				<div class="bgimg">
					<img :src="Audio.data[0].Audio.pic" />
				</div>
				<div class="lyrics">
					<div class="lyrcsList">
						 <div :style="transform" class="settra">
						 	 <p v-for="(item, index) in lyrcsList" ref="song" :class="{active: index <= currentTime}">{{ item }}</p>
						 </div>
					</div>
				</div>
			</div>
		</article>
		<div id="opicon">
			<div class="musicBtn">
				<div class="btn_next f1">
					<i @click="prevsong"></i>
				</div>
				<div class="btn_start_end f1">
					<i @click="songEnd(1)" v-if="Audio.play === 0"></i>
					<i @click="songEnd(0)" v-else style="background-position: 0 -.42rem;"></i>
				</div>
				<div class="btn_music_list f1">
					<i @click="nextsong"></i>
				</div>
			</div>
		</div>
		<mt-range v-model="rangeValue" @change="setRangeValue">
			<div slot="start">{{ start }}</div>
			<div slot="end">{{ end }}</div>
		</mt-range>
	</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import { songApi } from '@/utils/api'
export default {
	data() {
		return {
			rangeValue: 0,
			end: 0.00,
			start: 0.00,
			setMusicTime: null,
			lyrcsList: null,
			transform: {
				translate3d: '',
			},
		}
	},
	computed: {
		...mapState([
			'currentTime',
			'duration',
			'Audio',
			'payIndex',
			'payList'
		])
	},
	watch: {
		currentTime(New, old) {
			this.start = this.getNewTime(New)
			this.rangeValue = parseInt((New / this.duration) * 100)
			let song = this.$refs.song
			let count = 0;
			for(let [i, val] of song.entries()) {
				if(val.className) {
					count += val.offsetHeight
				}
				this.$set(this.transform, 'transform', 'translate3d(0,-' + count + 'px,0)');
			}
		},
	},
	methods: {
		...mapActions([
			'newPlay',
			'setPlay'
		]),
		setRangeValue(){
			console.log(111)
			this.Audio.el.currentTime = parseInt((this.rangeValue * this.duration) / 100)
		},
		getNewTime(str) {
			let minute = this.make(~~(str / 60))
			let second = this.make(~~(str - 60 * minute));
			let time = `${minute}:${second}`;
			return time;
		},
		make(time) {
			return time >= 10 ? time : `0${time}`
		},
		getLyrics() {
			songApi(this.Audio.data[0].Audio.lyrics, {}).then((res) => {
				Indicator.close();
				this.getLyric(res)
			}).catch((res) => {
				Indicator.close();
				console.error(res)
			})
		},
		getLyric(e) {
			let lyrics = e.split("\n");
			let lrcObj = {};
			for(let i = 0; i < lyrics.length; i++) {
				let lyric = decodeURIComponent(lyrics[i]);
				let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
				let timeRegExpArr = lyric.match(timeReg);
				if(!timeRegExpArr) continue;
				let clause = lyric.replace(timeReg, '');
				for(let k = 0, h = timeRegExpArr.length; k < h; k++) {
					let t = timeRegExpArr[k];
					let min = Number(String(t.match(/\[\d*/i)).slice(1)),
						sec = Number(String(t.match(/\:\d*/i)).slice(1));
					let time = min * 60 + sec;
					lrcObj[time] = clause;
				}
			}
			this.lyrcsList = lrcObj
		},
		prevsong() {
			let index = this.payIndex;
			index === this.payList.length - 1 ? index = 0 : index--
				if(this.payList[index].Audio.id === this.Audio.id) {
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
			setTimeout(()=>{
				this.getLyrics()
			},1000)
			this.newPlay(this.payList[index])
		},
		nextsong() {
			let index = this.payIndex;
			index === this.payList.length - 1 ? index = 0 : index++
				if(this.payList[index].Audio.id === this.Audio.id) {
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
			setTimeout(()=>{
				this.getLyrics()
			},1000)
			this.newPlay(this.payList[index])
		},
		songEnd(e) {
			e === 1 ? this.Audio.el.play() : this.Audio.el.pause()
			this.setPlay(e)
		},
		touchStart(e = event) {
			this.clientX = e.touches[0].clientX
		},
		touchMove(e = event) {
			this.clientx = e.touches[0].clientX
		},
		touchEnd(e = event) {
			let x = this.clientx - this.clientX
			if(x > 0) {
				this.prevsong()
			} else {
				this.nextsong()
			}
		},
	},
	created() {
		this.getLyrics()
		this.end = this.getNewTime(this.duration)
	}
}
</script>

<style lang="less">
#songDetails {
	width: 100%;
	height: 100%;
	padding: 15% 3%;
	position: relative;
	#object {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		-o-object-fit: cover;
		object-fit: cover;
		-webkit-transform: scale(1.1) translateZ(0);
		transform: scale(1.1) translateZ(0);
		-webkit-filter: blur(36px);
		filter: blur(36px);
	}
	#author {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
		color: black;
		font-size: 20px;
		margin-bottom: .2rem;
		.name {
			color: gray;
			font-size: 14px;
		}
	}
	#lyricsList {
		width: 100%;
		height: 2.4rem;
		position: relative;
		.bgimg {
			position: absolute;
			top: 0;
			left: 50%;
			z-index: 10;
			width: 2.4rem;
			height: 2.4rem;
			margin-left: -1.17rem;
			border-radius: 50%;
			overflow: hidden;
			opacity: .1;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.lyrics {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 20;
			width: 100%;
			height: 100%;
			.lyrcsList {
				width: 100%;
				height: 2.4rem;
				overflow: hidden;
				.settra {
					transition: -webkit-transform 0.3s ease-out 0s;
					transform-origin: 0 0 0;
					padding-top: 1rem;
				}
				-webkit-mask: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #fff 25%, #fff 75%, rgba(0, 0, 0, 0));
				p {
					color: black;
					line-height: 2;
					margin: 0 .2rem;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 16px;
				}
				p.active {
					color: #31c27c;
				}
			}
		}
	}
	#opicon {
		height: .9rem;
		width: 100%;
		.musicBtn {
			height: 100%;
			width: 90%;
			margin: auto;
			display: flex;
			.btn_start_end {
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					display: block;
					width: .4rem;
					height: .4rem;
					background-position: 0 0;
					background-image: url(../assets/images/list_sprite.png);
					background-repeat: no-repeat;
					background-size: .4rem;
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
					width: .4rem;
					height: .4rem;
					border-radius: 50%;
					border: .01rem solid rgba(0, 0, 0, .5);
				}
				i:after {
					content: " ";
					display: block;
					height: 0;
					width: 0;
					border-color: transparent rgba(0, 0, 0, .5) transparent transparent;
					border-width: .07rem .11rem;
					border-style: solid;
					border-radius: .02rem;
					margin-left: -.1rem;
				}
				i:before {
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
					width: .4rem;
					height: .4rem;
					border-radius: 50%;
					border: .01rem solid rgba(0, 0, 0, .5);
				}
				i:before {
					content: " ";
					display: block;
					height: 0;
					width: 0;
					border-color: transparent transparent transparent rgba(0, 0, 0, .5);
					border-width: .07rem .11rem;
					border-style: solid;
					border-radius: .02rem;
					margin-right: -.1rem;
				}
				i:after {
					content: "";
					height: .14rem;
					width: .02rem;
					background-color: rgba(0, 0, 0, .5);
				}
			}
		}
	}
	.mt-range-thumb {
		width: .15rem;
		height: .15rem;
		margin-top: .075rem;
	}
	.mt-range-content {
		margin: 0 .3rem 0 .3rem;
	}
	.mt-range-runway {
		width: 100%;
	}
}
</style>