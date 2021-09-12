<template>
	<view class="diy-window"
		:style="{background: itemStyle.background, padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
		<!-- 
		  layout: -1 橱窗  2-2列  3-3列  4-4列 
		 -->
		<!-- 矩阵-->
		<view v-if="itemStyle.layout > -1" class="data-list" :class="[`avg-sm-${itemStyle.layout}`]">
			<view v-for="(dataItem, index) in dataList" :key="index" class="data-item"
				:style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
				<view class="item-image">
					<image class="image" :src="dataItem.imgUrl" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 橱窗-->
		<view v-else class="display">
			<!-- 橱窗的左侧-->
			<view class="display-left" :style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
				<image class="image" :src="dataList[0].imgUrl"></image>
			</view>
			<!-- 橱窗的右侧-->
			<view class="display-right">
				<!-- 右侧1-->
				<view v-if="dataList.length >= 2" class="display-right1"
					:style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
					<image class="image" :src="dataList[1].imgUrl"></image>
				</view>
				<!-- 右侧2-->
				<view class="display-right2">
					<view v-if="dataList.length >= 3" class="left"
						:style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
						<image class="image" :src="dataList[2].imgUrl"></image>
					</view>
					<view v-if="dataList.length >= 4" class="right"
						:style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}">
						<image class="image" :src="dataList[3].imgUrl"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemStyle: Object,
			params: Object,
			dataList: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 
	  清除浮动造成的影响
	 */
	/* 矩阵 */
	.diy-window .data-list::after
	{
		clear: both;
		content: " ";
		display: table;
	}

	.diy-window {
		.data-list {
			.data-item {
				float: left;
				box-sizing: border-box;
				.image{
					width: 100%;
					display: block;
				}
			}
		}
	}
	
	.diy-window .avg-sm-2>.data-item{
		width: 50%;
	}
	
	.diy-window .avg-sm-3>.data-item{
		width: 33.3333333%;
	}
	
	.diy-window .avg-sm-4>.data-item{
		width: 25%;
	}
	
	/* 橱窗 */
	.diy-window .display .image{
		width: 100%;
		height: 100%;
	}
	.diy-window{
		box-sizing: border-box;
		.display{
			width: 100%;
			/* 备用方案 */
			height: 400rpx;
			margin: 0;
			box-sizing: border-box;
			position: relative;
			.display-left{
				width: 50%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				box-sizing: border-box;	
			}
			.display-right{
				width: 50%;
				height: 100%;
				position: absolute;
				left: 50%;
				top: 0;
				box-sizing: border-box;
				.display-right1{
					width: 100%;
					height: 50%;
					position: absolute;
					left: 0;
					top: 0;
					box-sizing: border-box;
				}
				.display-right2{
					width: 100%;
					height: 50%;
					position: absolute;
					left: 0;
					top: 50%;
					box-sizing: border-box;
					.left{
						width: 50%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						box-sizing: border-box;
					
					}
					.right{
						width: 50%;
						height: 100%;
						position: absolute;
						left: 50%;
						top: 0;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>
