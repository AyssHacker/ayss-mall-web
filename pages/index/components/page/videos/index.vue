<template>
	<view
	 class="diy-video"
	 :style="{padding: `${itemStyle.paddingTop}px 0`}"
	>
		<video
		 class="video" 
		 :src="params.videoUrl" 
		 :style="{height: `${itemStyle.height}px`}"
		 :poster="params.poster"
		 :autoplay="params.autoplay === 1"
		 controls>
		 </video>
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

<style lang="less" scoped>
	.diy-video .video{
		width: 100%;
		display: block;
	}
</style>
