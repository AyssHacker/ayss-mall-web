<template>
	<view class="diy-goods" :style="{background: itemStyle.background}">
		<view class="goods-list" :class="[`display__${itemStyle.display}`, `column__${itemStyle.column}`]">
			<scroll-view>
				<view class="goods-item" v-for="(dataItem, index) in dataList" :key="index">
					<!-- 单列商品-->
					<block v-if="itemStyle.column === 1">
						<view class="dis-flex">
							<!-- 商品图片-->
							<view class="goods-item_left">
								<image :src="dataItem.goods_image" mode="" class="image"></image>
							</view>
							<view class="goods-item_right">
								<!-- 商品名称-->
								<view v-if="itemStyle.show.includes('goodsName')" class="goods-name twolist-hidden">
									<text>{{dataItem.goods_name}}</text>
								</view>
								<!-- 商品描述-->
								<view class="goods-item_desc">
									<!-- 商品卖点-->
									<view v-if="itemStyle.show.includes('sellingPoint')" class="desc-selling_point onelist-hidden">
										<text>{{dataItem.selling_point}}</text>
									</view>
									<!-- 商品销量-->
									<view v-if="itemStyle.show.includes('goodsSales')" class="desc-goods_sales">
										<text>已售{{dataItem.goods_sales}}件</text>
									</view>
									<!-- 商品价格-->
									<view class="desc-footer">
										<text v-if="itemStyle.show.includes('goodsPrice')" class="price-x">
											¥{{dataItem.goods_price_min}}
										</text>
										<text v-if="itemStyle.show.includes('linePrice')"  class="price-y">
											¥{{dataItem.line_price_min}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 多列商品-->
					<block v-else>
                        <!-- 商品图片-->
						<view class="goods-image">
							<image class="image" :src="dataItem.goods_image" mode="aspectFill"></image>
						</view>
						<view class="detail">
							<!-- 商品标题 -->
							<view v-if="itemStyle.show.includes('goodsName')" class="goods-name twolist-hidden">
								<text>{{dataItem.goods_name}}</text>
							</view>
							<!-- 商品价格 -->
							<view class="detail-price onelist-hidden">
								<text v-if="itemStyle.show.includes('goodsPrice')" class="goods-price">
									¥{{dataItem.goods_price_min}}
								</text>
								<text v-if="itemStyle.show.includes('linePrice')"  class="line-price">
									¥{{dataItem.line_price_min}}
								</text>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
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
	.diy-goods{
		.goods-list{
			padding: 4rpx;
			box-sizing: border-box;
			.goods-item{
				padding: 6rpx;
				box-sizing: border-box;
			}
			
			&.display__list{
				.goods-item{
					float: left;
					box-sizing: border-box;
					padding: 6rpx;
					background-color: #FFFFFF;
					.goods-image{
						position: relative;
						width: 100%;
						height: 0;
						padding-bottom: 100%;
						overflow: hidden;
						.image{
							width: 100%;
							height: 100%;
							position: absolute;
							top: 0;
							left: 0;
						}
					}
					.detail{
						padding: 8rpx;
						.goods-name{
							margin-top: 20rpx;
							height: 64rpx;
							line-height: 1.3;
							font-size: 26rpx;
						}
						.detail-price{
							margin-top: 6rpx;
							font-size: 24rpx;
							.goods-price{
								margin-right: 8rpx;
								color: #ff0000;
							}
							.line-price{
								text-decoration: line-through;
							}
						}
					}
				}
			}
			
			&.column__2{
				.goods-item{
					width: 50%;
				}
			}
			
			&.column__3{
				.goods-item{
					width: 33.333333%;
				}
			}
			
			&.column__1{
				.goods-item{
					width: 100%;
					height: 280rpx;
					margin-bottom: 12rpx;
					padding: 12rpx;
					box-sizing: border-box;
					background-color: #FFFFFF;
					&:last-child{
						margin-bottom: 0;
					}
					.goods-item_left{
						display: flex;
						width: 40%;
						align-items: center;
						.image{
							display: block;
							width: 240rpx;
							height: 240rpx;
						}
					}
					.goods-item_right{
						position: relative;
						width: 60%;
						.goods-name{
							margin-top: 20rpx;
							height: 64rpx;
							line-height: 1.3;
							font-size: 26rpx;
							
						}
						.goods-item_desc{
							margin-top: 8rpx;
							.desc-selling_point{
								font-size: 24rpx;
								color: #ff5500;
								width: 400rpx;
							}
							.desc-goods_sales{
								color: #999999;
								font-size: 24rpx;
								margin: 4rpx 0;
							}
							.desc-footer{
								font-size: 24rpx;
								margin-top: 4rpx;
								.price-x{
									margin-right: 16rpx;
									color: #FF0000;
								}
								.price-y{
									text-decoration: line-through;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
