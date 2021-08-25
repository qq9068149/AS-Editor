import router from '@/router/index'
/* 引入进度条 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
  window.scroll(0, 0)
})
