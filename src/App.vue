<template>
  <div id="app_App" :style="payList.length !== 0 ? 'padding-bottom: .4rem' : ''">
    <header-list></header-list>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-music></my-music>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import header from '@/components/header.vue'
import musicBox from '@/components/music.vue'
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {}
	},
	computed: {
		...mapState([
			'payList'
		]),
	},
	created() {
		this.$Progress.start()
		this.$router.beforeEach((to, from, next) => {
			this.$Progress.start()
			next()
		})
		this.$router.afterEach((to, from) => {
			this.$Progress.finish()
		})
	},
	mounted() {
		this.$Progress.finish()
	},
	components: {
		'header-list': header,
		'my-music':musicBox
	}
}</script>

<style>
</style>