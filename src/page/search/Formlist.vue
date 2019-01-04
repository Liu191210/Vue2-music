<template>
	<div id="searchFromlist">
		<ul v-if="searchList.length !== 0">
			<li v-for="(item, index) in searchList">
				<div id="searchList_main">
					<span class="clok"></span>
					<span class="rech_con" @click="Itemrech(item)">{{ item }}</span>
					<span class="del_ok" @click="removelist(index)"></span>
				</div>
			</li>
		</ul>
		<div class="clear_btn" @click="clear" v-if="searchList.length !== 0">
			清除记录
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
		}
	},
	computed: {
		...mapState([
			'searchList'
		])
	},
	methods: {
		...mapActions([
			'remove'
		]),
		removelist(index){
			this.remove(index)
		},
		clear(){
		  this.$store.state.searchList.splice(0,this.searchList.length)
		},
		Itemrech(item){
			this.$emit('searchItem', item)
		}
	}
}
</script>

<style lang="less">
#searchFromlist {
	background-color: white;
	li {
		border-top: 1px solid #ededed;
		padding: 0 .15rem;
	}
	#searchList_main {
		position: relative;
		display: block;
		height: .44rem;
		line-height: .44rem;
		.clok{
			position: absolute;
	    left: 0;
	    top: .12rem;
	    width: .2rem;
	    height: .2rem;
	    background-image: url(../../assets/images/clock_ic.png);
	    background-repeat: no-repeat;
	    background-size: cover;
	    text-indent: -10rem;
		}
		.rech_con {
			position: absolute;
			left: .4rem;
			right: .5rem;
			display: block;
			height: .44rem;
			line-height: .44rem;
			color: #000;
			font-size: 14px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.del_ok {
			position: absolute;
	    right: 0;
	    top: .12rem;
	    width: .2rem;
	    height: .2rem;
		}
		.del_ok::after,
		.del_ok::before {
			content: "";
			display: block;
			position: absolute;
	    left: 0;
	    top: 0;
	    content: "";
	    background: rgba(0,0,0,.6);
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
	.clear_btn{
		text-align: center;
    height: .4rem;
		line-height: .4rem;
    color: #47c88a;
    font-size: 14px;
	}
}
</style>