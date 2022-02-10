import { createRouter, createWebHashHistory } from 'vue-router'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
