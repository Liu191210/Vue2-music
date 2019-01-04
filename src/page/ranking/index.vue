<template>
  <div id="ranking">
    <ul>
      <li v-for="(item, index) in data.data.topList" :data-id="item.id">
      	<router-link :to="{ path: 'topList', query: { id: item.id }}" class="rank_main">
          <div class="rank_float_img">
          	<img :src="item.picUrl"  v-lazy.ranking="item.picUrl"/>
          	<span class="listen_count">
							<i></i>
							{{ item.listenCount }}
						</span>
          </div>
          <div class="rank_list">
            <div class="cont">
             <h3>{{ item.topTitle }}</h3>
              <p v-for="(grid, ind) in item.songList">
              	{{ ind + 1 }}
                <span>{{ grid.songname }}</span>-
                {{ grid.singername }}
              </p>
            </div>
          </div>
          <i class="arrow"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { ranking } from '@/utils/api'
export default {
	data() {
		return {
			data:{
				data:{  // 防止报topList为undefined 请求为异步参数没有设置完成就渲染出错
					topList:[]
				}
			}
		}
	},
	computed: {
		
	},
	methods: {
		ranking_list() {
			ranking({
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
				this.data = JSON.parse(res.slice(6,-1))
				Indicator.close();
			}).catch((res) => {
				Indicator.close();
			})
		}
	},
	created() {
		this.ranking_list()
	}
}
</script>

<style lang="less">
image[lazy=loading]:before {
  width: 100%;
	height: 100%;
  background: url(../../assets/images/loading.gif) no-repeat top center;
  background-size: contain;
  margin: auto;
}
#ranking {
	.arrow{
		position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -4px;
    width: 6px;
    height: 6px;
    border-right: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: rotate(-45deg);
	}
	ul {
		margin: .1rem;
		li {
			overflow: hidden;
			margin-bottom: .1rem;
			.rank_main {
				display: -webkit-box;
				background: #FFFFFF;
				position: relative;
				.rank_float_img {
					width: 1rem;
					height: 1rem;
					position: relative;
					img {
						width: 100%;
						height: 100%;
					}
					::after {
						content: "";
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
						z-index: 1;
						background-color: rgba(0, 0, 0, .1);
					}
					.listen_count{
				  	height: .12rem;
				  	bottom: .07rem;
				  	left: .05rem;
				  	line-height: .12rem;
				  	position: absolute;
				  	display: block;
				  	z-index: 10;
				  	color: white;
				  	font-size: 12px;
				  	i{
				  		display: block;
				  		float: left;
				  		width: .1rem;
				  		height: .1rem;
				  		background-position: 0 -.5rem;
				  		margin-right: .05rem;
				  		background-image: url(../../assets/images/list_sprite.png);
				  		background-repeat: no-repeat;
				  		background-size: 0.24rem .6rem;
				  	}
				  }
				}
				.rank_list {
					position: relative;
			    -webkit-box-flex: 1;
			    display: -webkit-box;
			    -webkit-box-align: center;
			    -webkit-box-pack: center;
			    .cont{
			    	-webkit-box-flex: 1;
            margin: 0 .1rem 0 0.15rem;
            h3{
            	color: black;
            	font-size: 16px;
            	font-weight: normal;
            	margin-bottom: .05rem;
            }
            p {
            	overflow: hidden;
            	white-space: nowrap;
            	text-overflow: ellipsis;
            	color: rgba(0, 0, 0, 0.5);
            	font-size: 14px;
            	margin-bottom: .05rem;
            	span {
            		color: #000;
            		margin-left: .08rem;
            		margin-right: .05rem;
            	}
            }
			    }
				}
			}
		}
	}
}
</style>