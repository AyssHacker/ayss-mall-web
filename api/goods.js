import request from '@/utils/request'

//api地址
const api = {
	list: 'goods/list'
}
//获取商品列表的数据
export const list = params => {
	return request.get(api.list,params)
}