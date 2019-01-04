import QS from 'qs'
import axios from 'axios'
import { Toast, Indicator } from 'mint-ui'

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
	const res = response.data
	return Promise.resolve(res)
}, error => {
	// 输出错误信息
	Toast(error.message)
	return Promise.reject(error)
})
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params
			})
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				Toast('加载失败');
				reject(err)
			})
	});
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params))
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				Toast('加载失败');
				reject(err)
			})
	});
}