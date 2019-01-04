<template>
	<div id="musicList">
		<div id="search_content" v-if="musicList.length !== 0">
			<ul>
				<li v-for="(item, index) in musicList" :data-id = "item.id" @click="setAudio_click(item) ">
					<!--<span v-if="item.pic"><img :src="item.pic"/></span>-->
					<i></i>
					<h6>{{ item.name }}</h6>
					<p>{{ item.singer }}</p>
				</li>
			</ul>
		</div>
		<!--<div id="no_search" style="display: none;">
			<h6>无匹配</h6>
			<p>很抱歉，没有找到与“{{ searchList[searchList.length - 1] }}”相关的结果。</p>
		</div>-->
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {}
	},
	props: {
		musicList: {
			type: Array
		}
	},
	computed: {
		...mapState([
			'audioPay'
		])
	},
	methods: {
		...mapActions([
			'setAudio'
		]),
		setAudio_click(e) {
			let jsonp = {
				Audio: {
					id: e.id,
					dataUrl: e.url,
					lyrics: e.lrc,
					pic: e.pic
				},
				Details: {
					name: e.name,
					singer: e.singer
				}
			}
			this.setAudio(jsonp)
		}
	},
	created() {

	}
}
</script>

<style lang="less">
#musicList {
	#search_content {
		li {
			position: relative;
			height: .55rem;
			padding-left: .56rem;
			overflow: hidden;
			font-size: 12px;
			border-bottom: 1px solid #E5E5E5;
			i {
				position: absolute;
				top: .18rem;
				left: .18rem;
				width: .22rem;
				height: .2rem;
				background-position: 0 0;
				background-image: url(../../assets/images/search_sprite.png);
				background-repeat: no-repeat;
				background-size: .22rem .3rem;
			}
			h6 {
				margin: .1rem 0 .02rem;
				line-height: .18rem;
				font-size: 14px;
				color: #000;
				font-weight: 300;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 95%;
			}
			p {
				color: #808080;
			}
			span {
				position: absolute;
				top: .08rem;
				left: .08rem;
				width: .4rem;
				height: .4rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	#no_search {
		position: relative;
		padding: 2.1rem 0 0;
		text-align: center;
		color: #808080;
		h6 {
			font-size: 18px;
			line-height: .36rem;
		}
		p {
			font-size: 14px;
		}
	}
	#no_search:before {
		content: "";
		position: absolute;
		left: 50%;
		top: .8rem;
		-webkit-background-size: cover;
		width: 1.06rem;
		height: 1.05rem;
		margin-left: -.53rem;
		background-image: url(../../assets/images/search_null.png);
	}
}
</style>