<template>
  <div id="search">
		<div id="searchForm">
			<div class="formIuput">
				<div @keyup.enter.prevent="search_no">
					<input type="search" name="search" id="search" @focus="cancelFocus" autocomplete="off" v-model="s" placeholder="搜索歌曲、歌单、专辑" />
					<span class="search_no"></span>
					<span class="del_btn" v-if="del" @click="delBtn"></span>
				</div>
			</div>
			<div class="cancel_btn" v-if="cancel" @click="cancelBtn">取消</div>
		</div>
		<List v-if="!cancel" @searchItem="getItem"></List>
		<div ref="getForm">
			<formlist v-if="cancel" @searchItem="getItem"></formlist>
		</div>
		<musiclist :musicList="musicLists" v-if="del"></musiclist>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast, Indicator } from 'mint-ui'
import { searchForm } from '@/utils/api'
import List from './searchList'
import Formlist from './Formlist'
import musicList from './musicList'
export default {
	data() {
		return {
			s: '',
			del: false,
			cancel: false,
			musicLists:[],
		}
	},
	watch: {
		s: function(newQuestion, oldQuestion) {
			if(this.s !== '') {
				this.del = true
			} else {
				this.del = false
			}
		}
	},
	methods: {
		...mapActions([
			'addlist'
		]),
		searchForm_list() {
			searchForm({
				"key": 579621905,
				"s": this.s,
				"limit": 100,
				"offset": 0,
				"type": "song"
			}).then(res => {
				this.musicLists = res.data
				Indicator.close();
			}).catch((res) => {
				Indicator.close();
			})
		},
		search_no() {
			if(this.s === '') {
				Toast('搜索词不能为空')
				return
			}
			this.addlist(this.s)
			this.searchForm_list()
			this.$refs.getForm.style.display = 'none'
		},
		delBtn() {
			this.s = ''
			this.$refs.getForm.style.display = 'block'
		},
		cancelFocus() {
			this.cancel = true
			this.musicLists = []
			this.$refs.getForm.style.display = 'block'
		},
		cancelBtn() {
			this.cancel = false
			this.s = ''
		},
		getItem(val) {
			this.s = val
			this.cancelFocus()
			this.search_no()
		}
	},
	components: {
		List,
		'formlist': Formlist,
		'musiclist': musicList
	}
}
</script>

<style lang="less">
#searchForm {
	background: #f4f4f4;
	padding: .1rem;
	display: -webkit-box;
	-webkit-box-orient: horizontal;
	-webkit-box-align: center;
	.formIuput {
		position: relative;
		border-radius: .03rem;
		background: #fff;
		height: .4rem;
		padding: .1rem .12rem .1rem .35rem;
		-webkit-box-flex: 1;
		input {
			-webkit-appearance: textfield;
			height: .2rem;
			line-height: .2rem;
			width: 100%;
			color: rgba(0, 0, 0, 0.3);
			-webkit-appearance: none;
			font-size: 14px;
			outline: none;
			border: 0px;
		}
		.search_no {
			position: absolute;
			top: .12rem;
			left: .1rem;
			width: .18rem;
			height: .18rem;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJlSURBVFhH7ZfRShRRHMb3Jkqzm7wJSrqIIDBxX6C0a62H6C7oqq4ixYreQMmMHkXbjLQeIYgyQuqiyIuotKDt923fyLCszv/MzF5EDnzs2T3/7zffOXNm5myjcXDUOAOtVquJ7qOn6AP6ZamtQ33NGk/ZG8VJJtEaagf1XJ7agwEdRI9zIT7RnkdT6Iz7VaO2flPf51z9I9oDtQQDNIxeGv6Nz9voaBFcNa79bu8LsYp8+/Z75FmYN3w/nwqUB204lFiDqYzd+txlek37RFkQ3pNIjDZaKsXBeMkATfloKUjOBGMMifUbXUzmYVp3oFvJ5j0M8GbNXEtiYtJzRtOru6lwAUfhsIZQdveNR30NTPccaD5sChbCXTD7btDSUCAdmqGpsClYCHPa7CdBSyeQXgEKNBI2BQthnjX7Y9DSCfTTpkNhU7AQ7jGzd4KWvgc67EDbKYH6eclOO9BmSqBsUU+HTcFCwJcdaCVo6Vyy7LZfCJuChbAfONCdoKUTKHsw6iE2FDYWFIqFthxoLImLSZsr3fqzScZ9isUyczWZiXEC6UWoF2LaaHqcDcY4+mHmheRAMmBe8oje8nmqFOQvZwS9N2uxLEcgbUuzDdpGmZnyzLxzGG3yqm1lARxH2VZEUz6DChc6NXoia83I087pRukZyozAjqCHvv6Cf0GL6Ao655MrgNr6TX1bDqF1qO/Xcv7qobymJoA+6xpxfvTd7VVqdxcw7au1h3IwbUfn0DJ6hb6ibbSJVtzX8w9B30JVWQf/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC);
			background-repeat: no-repeat;
			background-size: cover;
			text-indent: -1rem;
		}
		.del_btn {
			position: absolute;
			top: .12rem;
			right: .12rem;
			width: .18rem;
			height: .18rem;
			background: #b1b1b1;
			text-indent: -10rem;
			border-radius: 1rem;
		}
		.del_btn::after {
			width: .02rem;
			height: .1rem;
			margin-left: -.01rem;
			margin-top: -.05rem;
		}
		.del_btn::after,
		.del_btn::before {
			content: "";
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			border-radius: .08rem;
			background: #fff;
			-webkit-transform: rotate(45deg);
		}
		.del_btn::before {
			width: .1rem;
			height: .02rem;
			margin-left: -.05rem;
			margin-top: -.01rem;
		}
	}
	.cancel_btn {
		padding-right: .1rem;
		padding-left: .1rem;
		font-size: .14rem;
		height: .36rem;
		line-height: .36rem;
	}
}
</style>