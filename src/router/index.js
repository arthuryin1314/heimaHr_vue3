import { createRouter, createWebHistory } from 'vue-router'
import { loginRoute } from './modules/login'
import { layoutRoutes } from './modules/layout'
import {useLoginStore} from '@/stores/login'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    loginRoute,
    layoutRoutes
  ],
})
router.beforeEach((to, from, next) => {
  const whiteList = ['/login']
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const token = useLoginStore().token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
