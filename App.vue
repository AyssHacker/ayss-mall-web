<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 引入uview-ui的样式文件 */
	@import  "uview-ui/index.scss";
	// 引入 app.scss
	@import "./app.scss"
</style>
