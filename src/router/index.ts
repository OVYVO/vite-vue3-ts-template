import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

const routerContext: any = import.meta.glob('./*.ts', { eager: true })
Object.keys(routerContext).forEach((item: any) => {
  Object.keys(routerContext[item]).forEach((it: any) => {
    routes.push(...routerContext[item][it])
  })
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('路由去向', to)
  console.log('路由来源', from)
  next()
})

export default router