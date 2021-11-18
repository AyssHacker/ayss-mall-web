<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption"
		:down="{native: true}" :sticky="true">
		<!-- 页面头部 -->
		<view class="header">
			<search class="search" :tips="options.search ? options.search : '搜索商品'" @event="handleSearch" />
			<!-- 切换列表显示方式 -->
			<view class="show-view" @click="handleShowView">
				<text class="iconfont icon-view-tile" v-if="showView"></text>
				<text class="iconfont icon-view-list" v-else></text>
			</view>
		</view>

		<!-- 排序标签 -->
		<view class="store-sort">
			<view class="sort-item" :class="{active: sortType === 'all'}" @click="handleSortType('all')">
				<text>综合</text>
			</view>
			<view class="sort-item" :class="{active: sortType === 'sales'}" @click="handleSortType('sales')">
				<text>销量</text>
			</view>
			<view class="sort-item sort-item-price" :class="{active: sortType === 'price'}"
				@click="handleSortType('price')">
				<text>价格</text>
				<view class="price-arrow">
					<view class="icon up" :class="{active: sortType === 'price' && !sortPrice}">
						<text class="iconfont icon-arrow-up"></text>
					</view>
					<view class="icon down" :class="{active: sortType === 'price' && sortPrice}">
						<text class="iconfont icon-arrow-down"></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list clearfix" :class="['column-' + (showView ? '1' : '2')]">
			<view class="goods-item" v-for="(item, index) in list.data" :key="index"
				@click="onTargetDetail(item.goods_id)">
				<!-- 单列显示 -->
				<view v-if="showView" class="dis-flex">
					<!-- 商品图片 -->
					<view class="goods-item_left">
						<image class="image" :src="item.goods_image"></image>
					</view>
					<view class="goods-item_right">
						<!-- 商品名称 -->
						<view class="goods-name twolist-hidden">
							<text>{{ item.goods_name }}</text>
						</view>
						<view class="goods-item_desc">
							<!-- 商品卖点 -->
							<view class="desc-selling_point dis-flex">
								<text class="onelist-hidden">{{ item.selling_point }}</text>
							</view>
							<!-- 商品销量 -->
							<view class="desc-goods_sales dis-flex">
								<text>已售{{ item.goods_sales }}件</text>
							</view>
							<!-- 商品价格 -->
							<view class="desc_footer">
								<text class="price_x">¥{{ item.goods_price_min }}</text>
								<text class="price_y col-9"
									v-if="item.line_price_min > 0">¥{{ item.line_price_min }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 多列显示 -->
				<view v-else class="">
					<!-- 商品图片 -->
					<view class="goods-image">
						<image class="image" mode="aspectFill" :src="item.goods_image"></image>
					</view>
					<view class="detail">
						<!-- 商品标题 -->
						<view class="goods-name twolist-hidden">
							{{ item.goods_name }}
						</view>
						<!-- 商品价格 -->
						<view class="detail-price onelist-hidden">
							<text class="goods-price f-30 col-m">￥{{ item.goods_price_min }}</text>
							<text v-if="item.line_price_min > 0"
								class="line-price col-9 f-24">￥{{ item.line_price_min }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</mescroll-body>
</template>

<script>
	// 1. 引入
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins"
	
	import * as GoodsApi from '@/api/goods'
	import {getMoreDataList} from '@/utils/app'
	
	export default {
		components: {
			MescrollBody
		},
		data() {
			return {
				// 上拉加载配置  配置空空如也
				upOption: {
					auto: true,
					page: {
						size: 15
					},
					noMoreSize: 4
				},
				// 接收上一个界面参数
				options: {},
				// 列表显示方式 (true 列表  false 平铺)
				showView: true,
				// 排序类型
				sortType: 'all', // all-综合   sales-销量  price-价格
				sortPrice: false, // 价格排序 (true- 高到低  false - 低到高)
				list: {
					total: 0, // 总记录数
					per_page: 15, // 每页显示记录数
					current_page: 1, // 当前页码
					last_page: 1, // 最大页码
					data: [] // 列表数据
				}
			}
		},
		onLoad(options) {
			console.log(options)
			this.options = options
		},
		mixins: [MescrollMixin],
		methods: {
			/**
			 * 商品搜索
			 */
			handleSearch() {
				const searchPageUrl = 'pages/search/index'
				// 判断来源页面
				let pages = getCurrentPages()

				if (
					pages.length > 1 &&
					pages[pages.length - 2].route === searchPageUrl
				) {
					uni.navigateBack()
					return
				}

				// 跳转到商品的搜索页
				this.$navTo(searchPageUrl)
			},
			/**
			 * 处理列表的展示
			 */
			handleShowView() {
				this.showView = !this.showView
			},
			/**
			 * 切换列表的排序方式
			 * @param {Object} newSortType
			 */
			handleSortType(newSortType) {
				// 0. 价格排序
				const newSortPrice = newSortType === 'price' ? !this.sortPrice : true
				// 1. 排序类型
				this.sortType = newSortType
				// 2. 排序价格
				this.sortPrice = newSortPrice
                // 3. 还原数据
				this.list = {
					total: 0, // 总记录数
					per_page: 15, // 每页显示记录数
					current_page: 1, // 当前页码
					last_page: 1, // 最大页码
					data: [] // 列表数据
				}  
				this.mescroll.resetUpScroll(true)
			},
			/**
			 * 上拉加载回调
			 * 页面初始化时会执行一次
			 */
			upCallback(page) {
				// 设置列表数据
				this.getGoodsList(page.num).then((list)=>{
					const curPageLen = list.data.length
					const totalSize = list.data.total
					this.mescroll.endBySize(curPageLen, totalSize);
				}).catch(()=>{
					this.mescroll.endErr()
				})
			},
			
			/**
			 * 获取商品列表
			 * @param {number} pageNo 页码    
			 */
			getGoodsList(pageNo = 1){
				// 传递的参数
				const param = {
					sortType: this.sortType,
					sortPrice: Number(this.sortPrice),
					categoryId: this.options.categoryId || 0,
					goodsName: this.options.search || '',
					page: pageNo
				}
				// 返回一个promise
				return new Promise((resolve, reject)=>{
					GoodsApi.list(param).then((result)=>{
						// 合并新数据
						const newList = result.data.list
						this.list.data = getMoreDataList(newList, this.list, pageNo)
						resolve(newList)
					}).catch(reject)
				})
			},
			/**
			 * 跳转到商品详情页
			 * @param {Object} goodsId 商品的id
			 */
			onTargetDetail(goodsId){
				this.$navTo('pages/goods/detail', {goodsId})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 页面头部
	.header {
		display: flex;
		align-items: center;
		background-color: #fff;

		// 搜索框
		.search {
			flex: 1;
		}

		// 切换显示方式
		.show-view {
			width: 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 36rpx;
			color: #505050;
		}
	}

	// 排序组件
	.store-sort {
		position: sticky;
		top: var(--window-top);
		display: flex;
		padding: 20rpx 0;
		font-size: 28rpx;
		background: #fff;
		color: #000;
		z-index: 99;

		.sort-item {
			flex-basis: 33.3333%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50rpx;

			&.active {
				color: #e49a3d;
			}
		}

		.sort-item-price .price-arrow {
			margin-left: 20rpx;
			font-size: 24rpx;
			color: #000;

			.icon {
				&.active {
					color: #e49a3d;
				}

				&.up {
					margin-bottom: -16rpx;
				}

				&.down {
					margin-top: -16rpx;
				}
			}

		}

	}

	// 商品列表
	.goods-list {
		padding: 4rpx;
		box-sizing: border-box;
	}

	// 单列显示
	.goods-list.column-1 {
		.goods-item {
			width: 100%;
			height: 280rpx;
			margin-bottom: 12rpx;
			padding: 20rpx;
			box-sizing: border-box;
			background: #fff;
			line-height: 1.6;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.goods-item_left {
			display: flex;
			width: 300rpx;
			background: #fff;
			align-items: center;

			.image {
				display: block;
				width: 240rpx;
				height: 240rpx;
			}
		}

		.goods-item_right {
			position: relative;
			// width: 450rpx;
			flex: 1;

			.goods-name {
				margin-top: 10rpx;
				height: 64rpx;
				line-height: 1.3;
				white-space: normal;
				color: #484848;
				font-size: 26rpx;
			}
		}

		.goods-item_desc {
			margin-top: 8rpx;
		}

		.desc-selling_point {
			width: 400rpx;
			font-size: 24rpx;
			color: #e49a3d;
		}

		.desc-goods_sales {
			color: #999;
			font-size: 24rpx;
		}

		.desc_footer {
			font-size: 24rpx;

			.price_x {
				margin-right: 16rpx;
				color: #f03c3c;
				font-size: 30rpx;
			}

			.price_y {
				text-decoration: line-through;
			}
		}
	}

	// 平铺显示
	.goods-list.column-2 {
		.goods-item {
			width: 50%;
		}
	}

	.goods-item {
		float: left;
		box-sizing: border-box;
		padding: 6rpx;

		.goods-image {
			position: relative;
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			overflow: hidden;
			background: #fff;

			&:after {
				content: '';
				display: block;
				margin-top: 100%;
			}

			.image {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				-o-object-fit: cover;
				object-fit: cover;
			}
		}

		.detail {
			padding: 8rpx;
			background: #fff;

			.goods-name {
				height: 64rpx;
				line-height: 32rpx;
				white-space: normal;
				color: #484848;
				font-size: 26rpx;
			}

			.detail-price {
				.goods-price {
					margin-right: 8rpx;
				}

				.line-price {
					text-decoration: line-through;
				}
			}
		}
	}
</style>
