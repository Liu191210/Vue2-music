<template>
<div id="list">
	<div class="mod_list">
		<h2>电台</h2>
		<ul class="flex_box">
			<li class="music-list root_flex" v-for="(item, index) in list.radioList">
				<div class="block">
					<div class="list_media">
						<img :src="item.picUrl" />
						<span class="play"></span>
					</div>
					<div id="list_info">
						<h3>{{ item.Ftitle }}</h3>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="mod_list">
		<h2>热门歌单</h2>
		<ul class="songList">
			<li class="music-list" v-for="(item, index) in list.songList">
				<div class="block">
					<div class="list_media">
						<img :src="item.picUrl" />
						<span class="listen_count">
							<i></i>
							{{ item.accessnum }}
						</span>
						<span class="play"></span>
					</div>
					<div id="list_info">
						<h3>{{ item.songListDesc }}</h3>
						<p>{{ item.songListAuthor }}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<footer>
		<div class="version_tab">
			<svg height="28" width="28" class="octicon octicon-mark-github text-white" viewBox="0 0 16 16" version="1.1"  aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
			<a href="https://github.com/Liu191210/Vue/tree/master/Music">Github</a>
		</div>
		<div class="footer_logo"></div>
	</footer>
</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		list: Object
	}
}
</script>

<style lang="less">
#list {
	margin: 0 .1rem .07rem .1rem;
	h2 {
		font-size: 16px;
		color: black;
		margin-bottom: .11rem;
	}
	.songList {
		li {
			width: 50%;
			float: left;
			#list_info h3 {
				height: .20rem;
			}
		}
		p {
			margin: 0;
			font-size: 12px;
		}
		.listen_count {
			height: .12rem;
			bottom: .07rem;
			left: .05rem;
			line-height: .12rem;
			position: absolute;
			display: block;
			z-index: 10;
			color: white;
			font-size: 12px;
			i {
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
	ul {
		overflow: hidden;
		margin-right: -.08rem;
		li {
			padding-right: .08rem;
			margin-bottom: .1rem;
			overflow: hidden;
			width: 100%;
			height: 100%;
			.block {
				display: block;
				background-color: white;
			}
			.list_media {
				position: relative;
				margin-bottom: .05rem;
				img {
					width: 100%;
				}
				.play {
					height: .24rem;
					bottom: .05rem;
					right: .05rem;
					width: .24rem;
					background-position: 0 0;
					background-image: url(../../assets/images/list_sprite.png);
					background-repeat: no-repeat;
					background-size: 0.24rem .6rem;
					position: absolute;
					display: block;
					z-index: 10;
				}
			}
			#list_info {
				padding: 0 .07rem .05rem;
				color: #000000;
				display: block;
				width: 100%;
				h3 {
					font-size: 14px;
					height: .36rem;
					line-height: .18rem;
					white-space: normal;
					word-wrap: break-word;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: normal;
				}
			}
		}
	}
	footer {
		padding: .15rem 0;
		text-align: center;
		position: relative;
		font-size: 14px;
		color: #000000;
		.version_tab {
			height: .28rem;
			line-height: .28rem;
			display: flex;
			justify-content: center;
		}
		a {
			color: black;
			margin-left: .05rem;
		}
		.footer_logo {
			width: .82rem;
			height: .24rem;
			margin: 0 auto .1rem;
			background-image: url(../../assets/images/logo_footer.png);
			background-repeat: no-repeat;
			background-size: cover;
			text-indent: 10rem;
			margin-top: .2rem;
		}
	}
}
</style>
