<template>
  <div id="searchList">
  	<h3>热门搜索</h3>
  	<div class="search_list">
  		<a href="javascript:;" class="keyword" target="_blank" rel="nofollow noreferrer noopener">{{ data.special_key }}</a>
  		<div class="keyword" v-for="(item, index) in data.hotkey" :data-id = "item.n" @click="Itemrech(item.k)">{{ item.k }}</div>
  	</div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { search } from '@/utils/api'
export default {
	data() {
		return {
			data: {}
		}
	},
	methods: {
		search_list() {
			search({}).then(res => {
				res.data.hotkey.length = 8;
				this.data = res.data
				Indicator.close();
			}).catch((res) => {
				Indicator.close();
			})
		},
		Itemrech(item){
			this.$emit('searchItem', item)
		}
	},
	created() {
		this.search_list()
	}
}
</script>

<style lang="less">
#searchList {
	background: #fff;
	padding: .15rem;
	padding-bottom: .1rem;
	color: rgba(0, 0, 0, .6);
	h3 {
		font-size: 12px;
		margin-bottom: .08rem;
	}
	.search_list {
		a {
			color: #fc4524;
			border-color: #fc4524;
		}
	}
	.keyword {
		display: inline-block;
		font-size: 14px;
		padding: 0 .1rem;
		height: .3rem;
		line-height: .3rem;
		color: #000;
		border: 1px solid rgba(0, 0, 0, .6);
		border-radius: .99rem;
		word-break: keep-all;
		margin-bottom: .1rem;
		margin-right: .14rem;
	}
}
</style>