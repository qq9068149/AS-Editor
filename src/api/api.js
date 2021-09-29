import httpAjax from './http.js'

class httpApi {

	// 获取视频列表
	newsList = (data) => httpAjax({
		url: '/adm/component/getCourseList',
		method: 'post',
		data
	})
	
	// 上传图片base64
	miniShop = (data) => httpAjax({
		url: '/upload/base64/miniShop',
		method: 'post',
		data
	})

	// 保存
	save = (data) => httpAjax({
		url: '/adm/component/save',
		method: 'post',
		header: 'json',
		data
	})
	
	//上架
	shelves = (data) => httpAjax({
		url: '/adm/shopTemplate/shelves',
		method: 'post',
		header: 'json',
		data
	})

	//获取创建过的页面列表
	shopTemplate = (data) => httpAjax({
		url: '/adm/shopTemplate/list',
		method: 'post',
		header: 'json',
		data
	})

	//获取页面模板
	shopTemplates = data => httpAjax({
		url: '/apiShop/shopTemplate',
		data,
		method: 'post'
	})

	//获取历史页面
	listData = data => httpAjax({
		url: '/adm/shopTemplate/list.data',
		data,
		method: 'post'
	})

	//设为主页
	homePage = data => httpAjax({
		url: '/adm/shopTemplate/homePage',
		data,
		method: 'post'
	})
	
	//删除选项
	delete = data => httpAjax({
		url: '/adm/shopTemplate/delete',
		data,
		method: 'post'
	})

	//获取下拉框模板类型
	selectData = data => httpAjax({
		url: '/adm/poster/select.data',
		data,
		method: 'post'
	})

	//获取海报
	poster = data => httpAjax({
		url: '/adm/shopTemplate/poster',
		data,
		method: 'post'
	})

	//复制
	copy = data => httpAjax({
		url: '/adm/shopTemplate/copy',
		data,
		method: 'post'
	})

	//导出
	exportTemplate = data => httpAjax({
		url: '/adm/shopTemplate/export',
		data,
		method: 'post'
	})
	//导入
	importTemplate = data => httpAjax({
		url: '/adm/shopTemplate/import',
		data,
		method: 'post'
	})
	//获取系统模板
	defaultTemplate = data => httpAjax({
		url: '/adm/shopTemplate/defaultTemplate',
		data,
		method: 'post'
	})
	//获取当前用户权限
	getPermission = data => httpAjax({
		url: '/adm/permission/getPermission',
		data,
		method: 'post'
	})

	//获取当前用户权限
	loginAdminTest = data => httpAjax({
		url: '/loginAdminTest',
		data,
		method: 'post'
	})
	
	//设置为模板
	saveDefaultTemplate = data => httpAjax({
		url: '/adm/shopTemplate/saveDefaultTemplate',
		data,
		method: 'post'
	})

	//查看店铺概要信息
	queryShopInfo = data => httpAjax({
		url: '/adm/shop/queryShopInfo',
		data,
		method: 'post'
	})

	//修改店铺信息，目前只支持名称和头像链接修改
	updateShopInfo = data => httpAjax({
		url: '/adm/shop/updateShopInfo',
		data,
		method: 'post'
	})
	

	//动态获取商品数据		
	getShopCommodity = data => httpAjax({
		url: '/adm/shop/getShopCommodity',
		data,
		method: 'post'
	})
	

}

export default new httpApi()