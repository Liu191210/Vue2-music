<template>
  <div id="slider">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in json"><img :src="item.picUrl"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
	data() {
		return {
			swiperOption: {
				autoplay: {
					delay: 5000,
					loop: true,
					disableOnInteraction: false,
					followFinger: false,
				},
				pagination: {
					el: '.swiper-pagination'
				}
			}
		}
	},
	props: {
		json: Array
	}
}
</script>

<style lang="less">
	#slider {
		width: 100%;
		overflow: hidden;
		height: 1.44rem;
		position: relative;
		margin-bottom: 0.14rem;
		.swiper-container {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.swiper-pagination-bullet{
			background: rgba(144,144,144,.8);
		}
		.swiper-pagination-bullet-active {
			background-color: white;
		}
	}
</style>
