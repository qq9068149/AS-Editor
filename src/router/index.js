import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/establishShop' },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [
      {
        //首页
        path: '/home',
        name: 'home',
        component: () => import('@/layout/home'),
      },
    ],
  },
  {
    //创建页面
    path: '/establishShop',
    name: 'establishShop',
    component: () => import('@/views/establishShop'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
