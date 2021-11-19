/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理=
 */

 import { Toast } from 'vant';
 import axios from 'axios'
 
 let loadingInstance = null				// 全局加载loadding
 
 const instance = axios.create({    //创建axios实例
   timeout: 10000, // 设置超时时间10s
   baseURL: window.global_config.BASE_URL		  // 请求配置静态文件config/config.js		dev模式下为 api 走代理模式
 })
 
 
 // 设置默认请求头
 instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
 // 跨域允许携带cookie
 instance.defaults.withCredentials = true 
 
 // 请求拦截器
 instance.interceptors.request.use(
   request => {
     // 在发送请求前验证token 并添加token请求头
     // if (getToken()) request.headers['token'] = getToken()
     loadingInstance = Toast.loading({
       message: '拼命加载中...',
       forbidClick: true,
       duration: 0,
       overlay: true,
       loadingType: 'spinner'
     });
     
     if (request.method === 'get') { // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
       request.params = {
         ...request.params,
         t: new Date().getTime()
       }
     }
 
     return request
   },
   error => {
     return error
   }
 )
 
 // 响应拦截
 instance.interceptors.response.use(
   response => {
 
     if (loadingInstance) {
       loadingInstance.clear()
     }
 
     let code = response.data.code
     let status = response.status
     // 1002:非法令牌和令牌过期 5012:其他客户端登录  6005 登录过期
     if (code === 1002 || code === 5012 || code == 6005) {
       // 清除本地所有数据
       // localStorage.clear()
     }
 
     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 
     if (status === 200) { // 请求成功
       return Promise.resolve(response.data)
     } else { // 错误的请求  抛出错误
       return Promise.reject(response)
     }
   },
 
   error => {
 
     if (loadingInstance) {
       loadingInstance.clear()
     }
     if (error.response) {
       // 根据请求失败的http状态码去给用户相应的提示
 
       return Promise.reject(error)
     } else {
       console.error(`请求错误${error}`)
       return Promise.reject(new Error('请求超时, 请刷新重试'))
     }
 
   }
 
 )
 
 
 /**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 export function get(url, params) {
   return new Promise((resolve, reject) => {
     instance.get(url, {
       params: params
     }).then(res => {
       resolve(res.data);
     }).catch(err => {
       reject(err.data)
     })
   })
 }
 
 /** 
  * post方法，对应post请求 
  * @param {String} url [请求的url地址] 
  * @param {Object} params [请求时携带的参数] 
  */
 export function post(url, params) {
   return new Promise((resolve, reject) => {
     instance.post(url, params)
       .then(res => {
         resolve(res.data);
       })
       .catch(err => {
         reject(err.data)
       })
   });
 }
 