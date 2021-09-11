<template>
	<!-- 搜索框 -->
	<view class="diy-search">
		<view class="inner" :class="itemStyle.searchStyle">
			<view class="search-input" :style="{textAlign: itemStyle.textAlign}">
				<text class="search-icon iconfont icon-search"></text>
				<text>{{params.placeholder}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
		  itemStyle: Object,
	      params: Object		  
		}
	}
</script>

<style lang="scss" scoped>
	.diy-search{
		background-color: #F1F1F2;
		padding: 20rpx;
		font-size: 26rpx;
		.inner{
			height: 60rpx;
			background-color: #FFFFFF;
			overflow: hidden;
			// 圆角
			&.radius{
				border-radius: 10rpx;
			}
			// 圆弧
			&.round{
				border-radius: 60rpx;
			}
			.search-input{
				height: 60rpx;
				line-height: 60rpx;
				color: #999;
				padding: 0 20rpx;
				.search-icon{
					margin-right: 8rpx;
				}
			}
		}
	}
</style>
