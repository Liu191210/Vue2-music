<template>
	<div id="songList">
		<mt-popup class="songBox" v-model="playListVisible" position="bottom">
			<header>
				播放列表
				<span class="payCount">({{ payList.length }}首)</span>
				<span class="payMode" @click="setpayMode"><img :src="imgList[imgindex]"/></span>
			</header>
			<ul class="containerList" v-if="payList.length">
				<li v-for="(item, index) in payList" :style="index === payIndex ? 'color:#31c27c' : ''">
					<div class="left_name_pay" @click="Add(index)">
						<i></i> {{ item.Details.name }} - <span style="font-size: 12px;" :style="index === payIndex ? 'color:#31c27c' : 'color:#808080'">{{ item.Details.singer}}</span>
					</div>
					<div class="pay_del del_ok" @click="delPay(index)"></div>
				</li>
			</ul>
			<div class="songlength" v-else title="你觉得它会出现吗">你的歌单空空如野(～﹃～)~zZ </div>
		</mt-popup>
	</div>
</template>

<script>
import repeat from '@/assets/images/repeat.svg'
import repeatone from '@/assets/images/repeatone.svg'
import allinclusive from '@/assets/images/allinclusive.svg'
import { mapState, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
	data() {
		return {
			playListVisible: false,
			imgindex: 0,
			imgList: [repeat, repeatone, allinclusive]
		}
	},
	computed: {
		...mapState([
			'payList',	
			'payMode',
			'Audio',
			'payIndex'
		])
	},
	watch: {
		'$route'(val) {
      // 路由跳转，关闭弹框 好像用不着
      this.playListVisible = false
    },
  },
	methods: {
		...mapActions([
			'setMode',
			'splicePayList',
			'Info','newPlay'
		]),
		toggleStates(){
			this.playListVisible = !this.playListVisible
		},
		setpayMode(){
			this.imgindex >= 2 ?  this.imgindex = 0  : ++this.imgindex
			let mes
			switch(this.imgindex) {
					case 0:
					  mes = '列表'
						break;
					case 1:
						mes = '单曲'
						break;
					case 2:
					  mes = '随机'
						break;
			}
			Toast({
			  message: `${mes}播放`,
			  position: 'top',
			  duration: 1000
			});
			this.setMode(this.imgindex)
		},
		delPay(e){
			if(this.payList.length === 1){
				this.Info()
				return 
			}
			if(this.payList[e].Audio.id === this.Audio.id){
				this.newPlay(this.payList[e+1])
			}
			this.splicePayList(e)
		},
		Add(index){
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
				duration: 500,
				position: 'top'
			});
			this.newPlay(this.payList[index])
		},
	}
}
</script>

<style lang="less">
#songList .songBox {
	background-color: white;
	border-top: 1px solid #F4F4F4;
	margin-bottom: .5rem;
	width: 100%;
	max-height: 4rem;
	overflow: auto;
	position: fixed;
	bottom: 0;
	left: 50%;
	transition: .2s ease-out;
	header {
		position: relative;
		display: block;
		height: .55rem;
		line-height: .55rem;
		text-align: center;
		font-weight: 300;
		font-size: 16px;
		color: #000;
		.payMode {
			position: absolute;
			top: 0;
			right: .1rem;
			width: .24rem;
			overflow: hidden;
			height: .24rem;
			line-height: 0;
			margin-top: .155rem;
			img {
				width: 100%;
				height: 100%;
				line-height: 0;
			}
		}
	}
	.songlength {
		height: .5rem;
		width: 100%;
		color: #999999;
		font-size: .16rem;
		text-align: center;
		line-height: .5rem;
		border-top: 1px solid #f4f4f4;
	}
	ul {
		li {
			position: relative;
			height: .45rem;
			overflow: hidden;
			padding: 0 .1rem;
			line-height: .45rem;
			font-size: 14px;
			font-weight: 300;
			border: rgba(0, 0, 0, .08) 1px solid;
			.left_name_pay {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				width: 80%;
				i {
					display: flex;
					justify-content: center;
					align-items: center;
					width: .3rem;
					height: .3rem;
					float: left;
					border-radius: 50%;
					margin-right: .06rem;
					margin-top: .07rem;
				}
				i:before {
					content: " ";
					display: block;
					height: 0;
					width: 0;
					border-color: transparent transparent transparent #31c27c;
					border-width: .07rem .11rem;
					border-style: solid;
					border-radius: 2px;
					margin-right: -.13rem;
				}
			}
		}
	}
	.del_ok {
		position: absolute;
		right: .1rem;
		top: .125rem;
		width: .2rem;
		height: .2rem;
		border-radius: 50%;
	}
	.del_ok::after,
	.del_ok::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		content: "";
		background: rgba(0, 0, 0, .6);
		-webkit-transform: rotate(45deg);
	}
	.del_ok::before {
		width: .17rem;
		height: .01rem;
		top: .08rem;
	}
	.del_ok::after {
		width: .01rem;
		height: .17rem;
		left: .08rem;
	}
}
</style>