<template>
	<view
		class="diy-notice"
		:style="{paddingTop:`${itemStyle.paddingTop}px`,paddingBottom:`${itemStyle.paddingTop}px`}"
	>
		<u-notice-bar
				 :list="[params.text]"
				 :volume-icon="params.showIcon"
				 :autoplay="params.scrollable"
				 :bg-color="itemStyle.background"
				 :color="itemStyle.textColor"
				 ></u-notice-bar>
	</view>
</template>

<script>
	export default {
		props: {
			itemStyle: Object,
			params: Object
		}
	}
</script>

<style scoped>
</style>
