import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 样式初始化
import 'css/reset.css'
import 'css/minx.less'

// 引入路由配置
import '@/router/routingConfiguration.js'

// 引入字体图标
import 'iconfont/iconfont.css'
import 'iconfont/iconfont.js'

// 引入请求拦截
import '@/api/request'
import httpApi from '@/api/api'
app.config.globalProperties.$httpApi = httpApi

// 挂载 uitls
import Utils from './utils/index'
app.config.globalProperties.$utils = Utils

// 注册全局过滤器/时间戳转换日期
// import globalFilter from '@/utils/filter'


