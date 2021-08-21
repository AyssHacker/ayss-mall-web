import * as util from "./util.js"


/**
 * 跳转到指定页面
 * 支持tabbar的跳转
 * @param {string} url
 * @param {object} query    
 */
export const navTo = (url, query = {}) => {
	if (!url || url.length === 0) {
		return false
	}
	//tabbar页面，使用switchTab
	if (util.inArray(url, getTabBarLink())) {
		uni.switchTab({
			url: `/${url}`
		})
		return true
	}
	//生成query的参数
	const queryStr = !util.isEmpty(query) ? '?' + util.urlEncode(query) : ''
	//普通页面跳转
	uni.navigateTo({
		url: `/${url}${queryStr}`
	})
	return true
}

/**
 * 获取tabbar跳转路径，页面路径列表
 */
export const getTabBarLink = () => {
	const tabBarLinks = [
		'pages/index/index',
		'pages/category/index',
		'pages/cart/index',
		'pages/user/index'
	]
	return tabBarLinks;
}

/**
 * 获取当前运行的终端(App H5 小程序)
 */
export const getPlatform = () => {
	// #ifdef APP-PLUS
	const platform = 'App'
	// #endif
	// #ifdef APP-PLUS-NVUE
	const platform = 'App'
	// #endif
	// #ifdef H5
	const platform = 'H5'
	// #endif
	// #ifdef MP-WEIXIN
	const platform = 'MP-WEIXIN'
	// #endif
	// #ifdef MP-ALIPAY
	const platform = 'MP-ALIPAY'
	// #endif
	// #ifdef MP-BAIDU
	const platform = 'MP-BAIDU'
	// #endif
	// #ifdef MP-TOUTIAO
	const platform = 'MP-TOUTIAO'
	// #endif
	// #ifdef MP-QQ
	const platform = 'MP-QQ'
	// #endif
	// #ifdef MP-360
	const platform = 'MP-360'
	// #endif
	return platform
}
/**
 * 显示成功的提示框
 */
export const showSuccess = (msg, callback) => {
	uni.showToast({
		title: msg,
		icon: 'success',
		mask: true,
		duration: 1500,
		success() {
			//有callback再去执行
			callback && callback()
		}
	})
}


/**
 * 显示失败的提示框
 */
export const showError = (msg, callback) => {
	uni.showModal({
		title: '温馨提示',
		content: msg,
		showCancel: false,
		success() {
			//有callback再去执行
			callback && callback()
		}
	})
}


/**
 * 显示纯文字提示框
 */
export const showToast = (msg, callback) => {
	uni.showToast({
		title: msg,
		icon:'none',
		duration: 1500,
		success() {
			//有callback再去执行
			callback && callback()
		}
	})
}
