import Vue from 'vue'

// 样式初始化
import 'css/reset.css'
import 'css/minx.less'

// 引入路由配置
import '@/router/routingConfiguration.js'

// 引入字体图标
import 'iconfont/iconfont.css'
import 'iconfont/iconfont.js'

/* 引入elementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* 引入Vant */
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入请求拦截
import '@/api/request'
import httpApi from '@/api/api'
Vue.prototype.$httpApi = httpApi

/* 设置cookies */
/* import VueCookies from 'vue-cookies'
Vue.use(VueCookies) */

// 挂载 uitls
import Utils from './utils/index'
Vue.prototype.$utils = Utils

// 注册全局过滤器/时间戳转换日期
import globalFilter from '@/utils/filter'

Object.keys(globalFilter).forEach((key) => {
  Vue.filter(key, globalFilter[key])
})
