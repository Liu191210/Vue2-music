<template>
<div id="toplist">
	<div class="containerDetail">
		<div class="inof_list">
			<div class="container">
				<div class="music_img"><img :src="data.topinfo.pic_album" /></div>
				<div class="Detail_list">
					<h1>{{ data.topinfo.ListName }}</h1>
					<p v-if=" data.day_of_year">第{{ data.day_of_year }}天</p>
					<p v-else>第{{ textDate }}周 </p>
					<p>{{ data.update_time }}更新</p>
				</div>
			</div>
			<div class="startMusic">
				<span @click="allPlay" v-if="time">播放全部</span>
				<span @click="allOut" v-else>暂停</span>
			</div>
		</div>
		<img :src="data.topinfo.pic_album" class="info_box__bg" />
	</div>
	<div id="detip">
		<div id="title">
			排行榜
			<span>共 {{ data.total_song_num }} 首</span>
		</div>
		<ul>
			<li v-for="(item, index) in data.songlist" @click="musicUrlClick(item)">
				<span :style="index < 3 ? 'color:#FF400B':''">{{ index + 1}}</span>
				<div>
					<h3>{{ item.data.songname }}</h3>
					<p>{{item.data.singer[0].name }}</p>
				</div>
			</li>
		</ul>
	</div>
	<div class="tit_qqmusic">
		<h2>简介</h2>
		<div class="detail_tit">
			<p v-html="data.topinfo.info"></p>
		</div>
		<div class="music_logo">
			<img src="../../assets/images/logo.svg"/>
			<span>QQ音乐</span>
		</div>
	</div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Indicator } from 'mint-ui'
import { rankingList } from '@/utils/api'
export default {
	data() {
		return {
			data: {
				topinfo: {
					pic_album: null
				}
			},
			textDate: '',
			time: true
		}
	},
	computed: {
		...mapState([
			'Audio',
			'queryId'
		])
	},
	watch: {
		"$route": { // 监测路由跳转
			handler(router) {
				if(router.query.id !== undefined && router.fullPath.includes('id')) {
					this.data = {
						topinfo: {
							pic_album: null
						}
					}
					this.rankingList()
				}
			}
		}
	},
	methods: {
		...mapActions([
			'setAudio','ForNew',
			'arrSet'
		]),
		rankingList() {
			rankingList({
				"g_tk": "5381",
				"uin": "0",
				"format": "jsonp",
				"inCharset": "utf-8",
				"outCharset": "utf-8",
				"notice": "0",
				"platform": "h5",
				"needNewCode": "1",
				"tpl": "3",
				"page": "detail",
				"type": "top",
				"topid": this.$route.query.id,
				"_": Date.now()
			}).then(res => {
				this.data = res
				this.textDate = res.date.substring(res.date.indexOf('_') + 1, res.date.length)
				Indicator.close();
			}).catch((res) => {
				Indicator.close();
			})
		},
		allPlay() {
			this.time = false
			if (this.Audio.el){ // 判断是否已经绑定audio
				this.Audio.el.play()
			}
			if(this.queryId.includes(String(this.$route.query.id))){
				return false
			}
			let jsonp = []
			for(let val of this.data.songlist) {
				jsonp.push({
					Audio: {
						id: val.data.songmid,
						dataUrl: `https://api.bzqll.com/music/tencent/url?id=${val.data.songmid}&key=579621905`,
						lyrics: `https://api.bzqll.com/music/tencent/lrc?id=${val.data.songmid}&key=579621905`,
						pic: `https://api.bzqll.com/music/tencent/pic?id=${val.data.songmid}&key=579621905`
					},
					Details: {
						name: val.data.songname,
						singer: val.data.singer[0].name
					}
				})
			}
			this.arrSet(String(this.$route.query.id))
			this.ForNew(jsonp)
		},
		allOut() {
			this.time = true
			this.Audio.el.pause()
		},
		musicUrlClick(e) {
			let jsonp = {
				Audio: {
					id: e.data.songmid,
					dataUrl: `https://api.bzqll.com/music/tencent/url?id=${e.data.songmid}&key=579621905`,
					lyrics: `https://api.bzqll.com/music/tencent/lrc?id=${e.data.songmid}&key=579621905`,
					pic: `https://api.bzqll.com/music/tencent/pic?id=${e.data.songmid}&key=579621905`
				},
				Details: {
					name: e.data.songname,
					singer: e.data.singer[0].name
				}
			}
			this.setAudio(jsonp)
		}
	},
	created() {
		this.rankingList()
	},
}
</script>

<style lang="less">
#toplist {
	background-color: white;
	.tit_qqmusic {
		h2 {
			font-weight: 300;
			font-size: 18px;
			color: #000000;
			height: .55rem;
			line-height: .55rem;
		}
		text-align: center;
		font-size: 14px;
		color: #777777;
		margin: 0 .16rem;
		p {
			margin-bottom: .2rem;
		}
		.music_logo {
			padding: .2rem 0 .5rem 0;
			img {
				display: block;
				width: .33rem;
				height: .33rem;
				overflow: hidden;
				margin: auto;
			}
			span {
				display: block;
				color: black;
				font-size: 14px;
				margin: .02rem;
			}
		}
	}
	.containerDetail {
		position: relative;
		width: 100%;
		height: 2.26rem;
		overflow: hidden;
		color: #fff;
		.info_box__bg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3;
			width: 100%;
			height: 100%;
			object-fit: cover;
			transform: scale(1.1) translateZ(0);
			filter: blur(36px);
		}
		.inof_list {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 4;
			overflow: hidden;
			background: rgba(0, 0, 0, 0.5);
			.container {
				display: -webkit-box;
				-webkit-box-pack: center;
				-webkit-box-align: center;
				-webkit-box-sizing: border-box;
				width: 100%;
				margin-top: .17rem;
				padding: 0 .16rem;
				overflow: hidden;
				height: 1.25rem;
				.music_img {
					position: relative;
					width: 1.25rem;
					margin-right: .1rem;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.Detail_list {
					-webkit-box-flex: 1;
					h1 {
						max-height: .47rem;
						line-height: 1.3;
						overflow: hidden;
						font-size: 18px;
					}
					p {
						max-height: .36rem;
						overflow: hidden;
						margin-top: .08rem;
						font-size: 12px;
					}
				}
			}
			.startMusic {
				display: flex;
				justify-content: center;
				align-items: center;
				height: .84rem;
				padding: 0 .16rem;
				-webkit-transition: 1s ease-in-out;
				position: absolute;
				left: 0;
				top: 1.4rem;
				width: 100%;
				span {
					display: inline-block;
					min-width: 1.3rem;
					padding: 0 .2rem;
					height: .4rem;
					line-height: .4rem;
					overflow: hidden;
					text-align: center;
					font-size: 16px;
					color: #fff;
					border-radius: 20px;
					background: #31c27c;
				}
			}
		}
	}
	#detip {
		width: 100%;
		overflow: hidden;
		#title {
			position: relative;
			display: -webkit-box;
			-webkit-box-align: center;
			height: .54rem;
			margin: 0 .16rem -.1rem;
			color: #777777;
			font-size: 14px;
		}
		ul {
			li {
				width: 100%;
				height: .62rem;
				overflow: hidden;
				span {
					width: .45rem;
					color: #777777;
					font-size: 14px;
					display: inline-block;
					line-height: .62rem;
					text-align: center;
				}
				div {
					float: right;
					display: flex;
					width: calc(100% - .45rem);
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;
					padding: .1rem 0;
					overflow: hidden;
					h3 {
						color: black;
						font-size: 16px;
						display: -webkit-box;
						-webkit-box-align: center;
						overflow: hidden;
						color: #333;
						font-weight: 300;
					}
					p {
						display: -webkit-box;
						-webkit-box-align: center;
						overflow: hidden;
						font-size: 14px;
						color: #777777;
					}
				}
			}
		}
	}
}
</style>