<template>
	<view class="container">
		<!-- 头部搜索 -->
		<view class="search-wrapper">
			<view class="search-input">
				<view class="search-input-wrapper">
					<view class="left">
						<text class="search-icon iconfont icon-search"></text>
					</view>
					<view class="right">
						<input 
						class="input" 
						type="text" 
						v-model="searchValue" 
						focus 
						placeholder="请输入您要搜索的商品" 
						/>
					</view>
				</view>
			</view>
			<view class="search-button">
				<button type="warn" class="button" @click="onSearch">搜索</button>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-if="historySearch.length">
			<view class="his-head">
				<text class="title">最近搜索</text>
				<!-- 删除垃圾篓 -->
				<text class="icon iconfont icon-delete col-7" @click="clearSearch"></text>
			</view>
			<view class="his-list">
				<view class="his-item" v-for="(val, index) in historySearch" :key="index">
					<view class="history-button" @click="handleQuick(val)">{{val}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const HISTORY_SEARCH = 'history_search'
	
	export default{
		data(){
			return {
				searchValue: '', // 搜索的内容
				historySearch: [] // 本地存放的搜索记录
			}
		},
		/**
		 * 生命周期函数 - 监听页面加载
		 */
		onLoad() {
			// 获取搜索的历史记录
			this.historySearch= this.getHistorySearch()
		},
		
		methods:{
			/**
			 * 获取本地的搜索记录
			 */
			getHistorySearch(){
				// 从本地缓存中去去
				return uni.getStorageSync(HISTORY_SEARCH) || []
			},
			/**
			 * 点击搜索
			 */
			onSearch(){
				const {searchValue} = this
				// 判断
				if(searchValue){
					// 记录历史搜索
					this.setHistory(searchValue)
					// 跳转到商品列表页
					this.$navTo('pages/goods/list', {search: searchValue})
				}
			},
			
			/**
			 * 记录历史搜索
			 * @param {String} searchValue
			 */
			setHistory(searchValue){
				// 1. 获取本地的搜索内容
				const data = this.getHistorySearch()
				// 2. 判断数组中有没有搜索的内容
				const index = data.indexOf(searchValue)
				// 3. 有则删除
				index > -1 && data.splice(index, 1)
				// 4. 数组头部插入
				data.unshift(searchValue)
				this.historySearch = data
				this.onUpdateStorage()
				
			},
			
			/**
			 * 更新历史搜索的缓存 
			 */
			onUpdateStorage(){
				uni.setStorageSync(HISTORY_SEARCH, this.historySearch)
			},
			
			/**
			 * 清除本地存储的搜索内容
			 */
			clearSearch(){
				this.historySearch = []
				this.onUpdateStorage()
			},
			/**
			 * 快速搜索
			 * @param {Object} search
			 */
			handleQuick(search){
				// 跳转到商品列表页   search:search
				this.$navTo('pages/goods/list', {search})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
	    padding: 20rpx;
	    min-height: 100vh;
	    background: #f7f7f7;
	  }
	
	  .search-wrapper {
	    display: flex;
	    height: 64rpx;
	  }
	
	  // 搜索输入框
	  .search-input {
	    width: 80%;
	    background: #fff;
	    border-radius: 10rpx 0 0 10rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	
	    .search-input-wrapper {
	      display: flex;
	
	      .left {
	        display: flex;
	        width: 60rpx;
	        justify-content: center;
	        align-items: center;
	
	        .search-icon {
	          display: block;
	          color: #b4b4b4;
	          font-size: 28rpx;
	        }
	
	      }
	
	      .right {
	        flex: 1;
	
	        input {
	          font-size: 28rpx;
	          height: 64rpx;
	          line-height: 64rpx;
	
	          .input-placeholder {
	            color: #aba9a9;
	          }
	        }
	
	      }
	    }
	  }
	
	  // 搜索按钮
	  .search-button {
	    width: 20%;
	    box-sizing: border-box;
	
	    .button {
	      line-height: 64rpx;
	      height: 64rpx;
	      font-size: 28rpx;
	      border-radius: 0 5px 5px 0;
	      background: #fa2209;
	    }
	  }
	
	
	  // 最近搜索
	  .history {
	
	    .his-head {
	      font-size: 28rpx;
	      padding: 50rpx 0 0 0;
	      color: #777;
	
	      .icon {
	        float: right;
	      }
	
	    }
	
	    .his-list {
	      padding: 10px 0;
	      overflow: hidden;
	
	      .his-item {
	        width: 33.3%;
	        float: left;
	        padding: 10rpx;
	        box-sizing: border-box;
	
	        .history-button {
	          text-align: center;
	          padding: 14rpx;
	          line-height: 30rpx;
	          border-radius: 100rpx;
	          background: #fff !important;
	          font-size: 26rpx;
	          border: 1px solid #efefef;
	          overflow: hidden;
	          white-space: nowrap;
	          text-overflow: ellipsis;
	        }
	
	      }
	
	    }
	  }
</style>
