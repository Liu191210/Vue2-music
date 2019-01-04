<template>
  <header id="header">
    <div class="mod_nav root_flex">
      <router-link  v-for="(item, index) in head" :class="{active: index === num}" :to="item.to" @click.native="tab(index)">{{ item.el }}</router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			head: [{
				'el': '推荐',
				'to': '/home'
			}, {
				'el': '排行榜',
				'to': '/ranking'
			}, {
				'el': '搜索',
				'to': '/search'
			}]
		}
	},
	computed: {
		...mapState([
			'num',
		])
	},
	methods: {
		...mapActions([
			'tabNum'
		]),
		tab(index) {
			this.tabNum(index)
			window.localStorage.tab = index
			if(index === 2){
				document.body.style.backgroundColor = "#FFFFFF";
			} else {
				document.body.style.backgroundColor = "#F4F4F4";
			}
		}
	},
	created() {
		if(localStorage.tab){
			this.tab(Number(localStorage.tab))
		}
	}
}
</script>

<style lang="less">
	#header {
		.mod_nav {
			background: #ffffff;
			-webkit-box-orient: horizontal;
			flex-direction: row;
			a {
				-webkit-flex: 1;
				position: relative;
				display: block;
				height: 0.4rem;
				line-height: 0.4rem;
				overflow: hidden;
				text-align: center;
				font-size: 0.16rem;
				color: rgba(0, 0, 0, 0.6);
				-webkit-box-sizing: border-box;
			}
			a.active {
				color: #31c27c;
			}
			a.active:after {
				content: "";
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 0.02rem;
				background: #31c27c;
			}
		}
	}
</style>