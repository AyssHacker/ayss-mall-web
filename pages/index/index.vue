<template>
	<view>
		<Page :items="items" />
	</view>
</template>

<script>
	import * as Api from '@/api/home'
	import Page from './components/page'
	export default {
		components: {
			Page
		},
		data() {
			return {
				//页面参数
				options: {},
				//页面属性
				page: {},
				//页面元素
				items: []
			}
		},
		onLoad(options) {
			//当前页面的参数
			this.options = options
			//请求页面数据
			this.getPageData()
		},
		methods: {
			getPageData(){
				const app = this;
				//如果pageid存在就用它  如果没有就是0
				const pageId = app.options.pageId || 0
				Api.detail(pageId).then(result=>{
					//{status: 200, message: "success", data: {…}   rsult的结果
					//console.log(result)
					//解析数据
					const {
						data: {
							pageData
						}
					} = result
					app.page = pageData.page
					app.items = pageData.items
					console.log(app.page,app.items)
					
					
				})
			}
		}
	}
</script>

<style>
	
</style>
