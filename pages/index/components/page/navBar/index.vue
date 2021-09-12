<template>
	<view 
	class="diy-navBar"
	:style="{padding: `${itemStyle.paddingTop}px 0`, background: itemStyle.background, color:  itemStyle.textColor}"
	>
		<view class="data-list" :class="[`avg-sm-${itemStyle.rowsNum}`]">
			<view class="item-nav" v-for="(dataItem, index) in dataList" :key="index">
				<view class="nav-to" @click="onLink(dataItem.link)">
					 <view class="item-image">
						 <image :src="dataItem.imgUrl" mode="widthFix" class="image"></image>
					 </view> 
					 <view class="item-text">
						 {{dataItem.text}}
					 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "../mixin.js"
	export default{
		props: {
			itemStyle: Object,
			params: Object,
			dataList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		
		mixins: [mixin]
	}
</script>

<style lang="scss" scoped>
	.diy-navBar .data-list::after
	{
		clear: both;
		content: " ";
		display: table;
	}
	
	.item-nav{
		float: left;
		margin: 10px 0;
		text-align: center;
		.item-text{
			font-size: 26rpx;
		}
		.item-image{
			.image{
				width: 88rpx;
				height: 88rpx;
			}
		}
	}
	
	.diy-navBar .avg-sm-3>.item-nav{
		width: 33.333333333%;
	}
	
	.diy-navBar .avg-sm-4>.item-nav{
		width: 25%;
	}
	
	.diy-navBar .avg-sm-5>.item-nav{
		width: 20%;
	}
</style>
