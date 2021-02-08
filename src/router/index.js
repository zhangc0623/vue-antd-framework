import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to)
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      // '预加载'router
      component: () => import('@/views/user/login/Login'),
      meta: {
        isNotValAuth: true // 不需要验证
      }
    },

    {
      path: '/loginError',
      name: 'LoginError',
      component: () => import('@/views/error/LoginError'),
      meta: {
        isNotValAuth: true // 不需要验证
      }
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/Layout'),
      redirect: store.getters['menuPath'],
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/Home')
        },
        {
          path: '/404',
          name: '404',
          component: () => import('@/views/exceptions/404')
        },
        {
          path: '/500',
          name: '500',
          component: () => import('@/views/exceptions/500')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ],
  scrollBehavior: () => ({ y: 0 }) // 当跳到新的页面的时候 自动跳到该页面的顶部
})
