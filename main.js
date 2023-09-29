import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from "@/store/store.js"
import './uni.promisify.adaptor'

//导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})
	if (options.url.indexOf("/my/") !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}

$http.afterRequest = function() {
	uni.hideLoading()
}

//封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif