import axios from 'axios'
import Vue from 'vue'
let base = window.global_config.BASE_URL;


// 推广链接
Vue.prototype.$baseURL ='https://wshop.starfirelink.com/'

// 请求域名
axios.defaults.baseURL = base

axios.defaults.withCredentials=true

// 请求拦截器
/* axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
) */

// 响应拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
    // 1002:非法令牌和令牌过期 5012:其他客户端登录
    if (res.code === 1002 || res.code === 9018 || res.code === 9996) {
      // 清除全部数据
     /*  localStorage.clear() */
      // 返回登录页面
      /* router.push({path: '/personalCourse'}) */
    }
    return response
  },
  error => {
    /* Toast("操作失败，请重新操作") */
    return error
  }
)
