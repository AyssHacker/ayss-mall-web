<template>
	<view class="diy-banner" :style="{height: `${imgHeights[imgCurrent]}rpx`}">
		<!-- 图片轮播 -->
		<swiper 
		class="swiper-box" 
		:indicator-dots="indicatorDots" 
		:autoplay="autoplay" 
		:interval="itemStyle.interval * 1000"
		:duration="duration"
		circular
		@change="bindChange"
			>
			<swiper-item v-for="(dataItem, index) in dataList" :key="index">
				<image class="slide-image" :src="dataItem.imgUrl" mode="widthFix" @load="getImagesHeight"></image>
			</swiper-item>
		</swiper>
		<!-- 指示器 -->
		<view class="indicator-dots" :class="itemStyle.btnShape">
			<view 
			class="dots-item" 
			:class="{active: imgCurrent === index}" 
			:style="{backgroundColor: itemStyle.btnColor}"
			v-for="(dataItem,index) in dataList" 
			:key="index">	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemStyle: Object,
			dataList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data(){
			return {
				indicatorDots: false, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				duration: 800,
				//视图的高度数组
				imgHeights: [],//视图的高度数组
				imgCurrent: 0 //当前轮播图选中的
			}
		},
		methods: {
			getImagesHeight(e){
				//1、获取图片的真实宽度和高度
				const imgWitdh = e.detail.width,
					  imgHeight=e.detail.height,
					  //获取宽高比
					  radio = imgWitdh/imgHeight
				//计算动态高度
				const viewHeight = 750/radio
				this.imgHeights.push(viewHeight)
				//console.log(this.imgHeights)
				
			},
			/*
			 记录当前指针
			*/
			bindChange(e){
				this.imgCurrent = e.detail.current
			}
		} 
	}
</script>

<style lang="scss" scoped>
	.diy-banner {
		position: relative;
		//swiper 组件
		.swiper-box {
			height: 100%;
			.slide-image {
				width: 100%;
				height: 100%;
				display: block;
				margin: 0 auto;
			}
		}
		//指示器样式
		.indicator-dots {
			width: 100%;
			height: 28rpx;
			//background-color: red;
			padding: 0 20rpx;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 20rpx;
			display: flex;
			//主轴对齐方式
			justify-content: center;
			align-items: center;
			.dots-item {
				width: 16rpx;
				height: 16rpx;
				margin-right: 8rpx;
				background-color: #ffffff;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					background-color: #313131 !important;
				}
			}
			//若指示器是圆点
			&.round .dots-item {
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
			}
			//若指示器是正方形
			&.square .dots-item {
				width: 16rpx;
				height: 16rpx;
				
			}
			//若指示器是长方形
			&.rectangle .dots-item {
				width: 22rpx;
				height: 14rpx;
				
			}
		} 
	}
</style>
