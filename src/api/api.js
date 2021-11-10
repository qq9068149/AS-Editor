import httpAjax from './http.js'

class httpApi {

	//手机登录接口
	loginAdminTest = data => httpAjax({
		url: '/loginAdminTest',
		data,
		method: 'post'
	})
	
}

export default new httpApi()