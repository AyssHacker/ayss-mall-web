<template>
	<view class="page-items">
		<block v-for="(item, index) in items" :key="index">
			<!-- 搜索框 -->
			<block v-if="item.type === 'search'">
				<Search :itemStyle="item.style" :params="item.params"/>
			</block>
			<!-- 轮播图 -->
			<block v-if="item.type === 'banner'">
				<Banner :itemStyle="item.style" :dataList="item.data" />
			</block>
			<!-- 商城公告 -->
			<block v-if="item.type === 'notice'">
				<Notice :itemStyle="item.style" :params="item.params"/>
			</block>
			<!-- 图片橱窗 -->
			<block v-if="item.type === 'window'">
				<Window :itemStyle="item.style" :params="item.params" :dataList="item.data"/>
			</block>
			<!-- 导航 -->
			<block v-if="item.type === 'navBar'">
				<NavBar  :itemStyle="item.style" :params="item.params" :dataList="item.data"/>
			</block>
			<!-- 图片组 -->
			<block v-if="item.type === 'image'">
				<Images :itemStyle="item.style"  :dataList="item.data"/>
			</block>
			<!-- 视频组 -->
			<block v-if="item.type === 'video'">
				<Videos :itemStyle="item.style" :params="item.params"/>
			</block>
			<!-- 商品 -->
			<block v-if="item.type === 'goods'">
				<Shop :itemStyle="item.style" :params="item.params" :dataList="item.data" />
			</block>
			<!-- 辅助空白 -->
			<block v-if="item.type === 'blank'">
				<Blank :itemStyle="item.style" />
			</block>
			<!-- 辅助线 -->
			<block v-if="item.type === 'guide'">
				<Guide :itemStyle="item.style"/>
			</block>
			<!-- 文章 -->
			<block v-if="item.type === 'article'">
				<Article :params="item.params" :dataList="item.data" />
			</block>
			<!-- 富文本 -->
			<block v-if="item.type === 'richText'">
				<RichText :itemStyle="item.style" :params="item.params"/>
			</block>
			<!-- 客服 -->
			<block v-if="item.type === 'service'">
				<Service  :itemStyle="item.style" :params="item.params" />
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
				type: Array,
				default () {
					return []
				}
			}
		}

	}
</script>

<style>
</style>
