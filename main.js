import Vue from 'vue'
import App from './App'

import {
	navTo,
	getPlatform,
	showToast,
	showSuccess,
	showError,
	getMoreDataList
} from './utils/app.js'
//引入 uview-ui组件
import uView from 'uview-ui'
// 引入vuex
import store from './store'

Vue.config.productionTip = false
Vue.use(uView)

App.mpType = 'app'

//挂载全局函数
Vue.prototype.$navTo = navTo
Vue.prototype.$platform = getPlatform()
Vue.prototype.$toast = showToast
Vue.prototype.$success = showSuccess
Vue.prototype.$error = showError

const app = new Vue({
    ...App,
	store
})
app.$mount()
