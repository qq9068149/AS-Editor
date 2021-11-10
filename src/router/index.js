import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [
      {
        //  首页
        path: '/home',
        name: 'home',
        component: () => import('@/layout/home'),
      },
    ],
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
