// 兼容IE
import 'babel-polyfill'

import Vue from 'vue'
import App from './App.vue'

import VueBus from 'vue-bus'
import router from './router'
import store from './store'
import i18n from './i18n/vue-i18n'
import Cookies from 'js-cookie'
// 配置全局权限js文件，若需要先登录，取消注释
// import './router/permission'
import './utils/registerServiceWorker'
// 公用less引入
import './assets/css/common.less'

// 请求全局引入
import { get, post, put, del, blobStream, blobDownload, pBlobDownload, realUrl } from './config/request'
/** 自定义组件引入 start */
// 面包屑导航
import Breadcrumb from './components/Breadcrumb'
Vue.component(Breadcrumb.name, Breadcrumb)
/** 自定义组件引入 end */
// 组件引入
Vue.use(VueBus)


Vue.config.productionTip = false
Vue.prototype.$Cookies = Cookies

// 封装的axios请求方法
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$delete = del
Vue.prototype.$blobStream = blobStream
Vue.prototype.$blobDownload = blobDownload
Vue.prototype.$pBlobDownload = pBlobDownload
Vue.prototype.$realUrl = realUrl
// 配置全局的错误报告
Vue.config.errorHandler = function (err, vm, info) {
  if (err.toString().indexOf('$i18n') === -1) {
    // 排除$i18n的错误，这个错误没必要告诉前台页面
    // console.log(`页面发生错误: ${err.toString()}\n错误信息：${info}`)
  }
}
/**
 * 路由守卫 ，拦截所有路由的请求
 */
router.beforeEach((to, from, next) => {
  // 处理title
  window.document.title = to.meta.title === undefined ? '前台系统' : to.meta.title
  next()
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
