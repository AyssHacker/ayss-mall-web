<template>
	<view class="page-items">
		<block v-for="(item,index) in items" :key="index">
			<!-- 判断 搜索框 -->
			<block v-if="item.type==='search'">
				<Search :itemStyle="item.style" :params="item.params"/>
			</block>
			<!-- 轮播图 -->
			<block v-if="item.type==='banner'">
				<Banner :itemStyle="item.style" :dataList="item.data"/>
			</block>
			<!-- 商城公告 -->
			<block v-if="item.type==='notice'">
				<Notice />
			</block>
			<!-- 图片橱窗 -->
			<block v-if="item.type==='window'">
				<Window />
			</block>
			<!-- 导航 -->
			<block v-if="item.type==='navBar'">
				<NavBar />
			</block>
			<!-- 图片组 -->
			<block v-if="item.type==='image'">
				<Images />
			</block>
			<!-- 视频组 -->
			<block v-if="item.type==='video'">
				<Videos />
			</block>
			<!-- 商品 -->
			<block v-if="item.type==='goods'">
				<Shop />
			</block>
			<!-- 辅助空白 -->
			<block v-if="item.type==='blank'">
				<Blank />
			</block>
			<!-- 辅助线条 -->
			<block v-if="item.type==='guide'">
				<Guide />
			</block>
			<!-- 文章 -->
			<block v-if="item.type==='article'">
				<Article />
			</block>
			<!-- 富文本 -->
			<block v-if="item.type==='richText'">
				<RichText />
			</block>
			<!-- 客服 -->
			<block v-if="item.type==='service'">
				<Service />
			</block>
		</block>
	</view>
</template>

<script>
	import Search from './search'
	import Banner from './banner'
	import Notice from './notice'
	import Window from './window'
	import NavBar from './navBar'
	import Videos from './videos'
	import Images from './image'
	import Shop from './shop'
	import Blank from './blank'
	import Guide from './guide'
	import Article from './article'
	import RichText from './richText'
	import Service from './service'
	export default {
		name: 'Page',
		components:{
			Search,
			Banner,
			Notice,
			Window,
			NavBar,
			Videos,
			Images,
			Shop,
			Blank,
			Guide,
			Article,
			RichText,
			Service
		},
		props: {
			items: {
				type:Array,
				default(){
					//数组类型也要返回数组
					return []
				}
			}
		}
	}
</script>

<style>
</style>
