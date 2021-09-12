<template>
	<view
	 class="diy-imageSingle"
	 :style="{padding: `${itemStyle.paddingTop}px`, background: itemStyle.background}"
	 >
		<view 
		class="item-image"
		v-for="(dataItem, index) in dataList"
		:key="index"
		 :style="{padding: `${itemStyle.paddingTop}px ${itemStyle.paddingLeft}px`}"
		>
			<view class="nav-to">
				<image class="image" :src="dataItem.imgUrl" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			itemStyle: Object,
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
	.diy-imageSingle .item-image .image{
		width: 100%;
		display: block;
	}
</style>
