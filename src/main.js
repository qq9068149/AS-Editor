import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
// 引入配置
/* 引入elementUI */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'vant/lib/index.css'
import Vant from 'vant'

// 组件自动化全局注册
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
)
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 全局注册组件
  app.component(
    componentConfig.default.name, // 此处的name,是组件属性定义的name
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

import './permission'

app.use(router).use(store).use(ElementPlus).use(Vant).mount('#app')
