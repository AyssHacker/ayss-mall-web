import request from '@/utils/request'

//api地址
const apiUrl = {
	detail: 'page/detail'
}
//获取首页的数据
export function detail(pageId){
	return request.get(apiUrl.detail,{pageId})
}