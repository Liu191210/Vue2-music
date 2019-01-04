<template>
  <section id="home">
    <banner_lists :json="this.index_list.slider"></banner_lists>
    <rankList :list="this.index_list"></rankList>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast, Indicator } from 'mint-ui'
import { banner } from '@/utils/api'
import banner_lists from './banner.vue'
import rankList from './list.vue'
export default {
	data() {
		return {}
	},
	computed: {
		...mapState([
			'index_list',
		])
	},
	methods: {
		banner_list() {
			banner({
				"g_tk": "5381",
				"uin": "0",
				"format": "jsonp",
				"inCharset": "utf-8",
				"outCharset": "utf-8",
				"notice": "0",
				"platform": "h5",
				"needNewCode": "1",
				"_": Date.now(),
				"jsonpCallback": "?"
			}).then(res => {
				console.log(res)
				Indicator.close();
				this.$store.state.index_list = res.data
			}).catch((res) => {
				Indicator.close();
			})
		}
	},
	created() {
		this.banner_list()
	},
	components: {
		'banner_lists': banner_lists,
		'rankList': rankList
	}
}
</script>

<style>
</style>
