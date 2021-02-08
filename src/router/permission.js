/*
 * @Author: weibf
 * @Date: 2019-09-10 16:05:45
 * @desc 页面权限的管理
 * @Last Modified by: weibf
 * @Last Modified time: 2019-07-12 15:03:16
 */
import Cookies from 'js-cookie'
import router from './index'
// import store from '../store'
import NProgress from 'nprogress' // progress bar

NProgress.configure({ showSpinner: false })
/**
 * 路由守卫 ，对所有路由进行权限处理
 */
router.beforeEach(async (to, from, next) => {
  // start progress bar
  // alert('to:' + to.path + ',location=' + location.href)
  NProgress.start()
  // 进入页面的之前 先检测是否进入页面的时候有token(除了特殊页面，如登录，注册，密码等页面)
  if (to.meta.isNotValAuth) {
    // store.dispatch('app/updateSetting', false)
    // 移除hash值
    let tokenMap = checkAndDealHashToken()
    if (tokenMap.get('success')) {
      window.location.href = location.href.replace(location.hash, '')
    } else {
      next()
    }
  } else {
    // 检查hash中的token
    let tokenMap = checkAndDealHashToken()
    // hash中的token需要处理掉
    if (tokenMap.get('success')) {
      window.location.href = location.href.replace(location.hash, '')
      // router.replace({path: to.path, query: to.query})
    } else {
      // 获取保存的 token信息
      let token = tokenMap.get('token')
      // 是否有token
      let hasToken = token !== 'undefined' && token !== undefined && token !== null && token !== ''
      let canNext = hasToken
      // 直接跳转
      if (canNext) {
        // 如果有token，再做权限判断等操作，这里暂时忽略
        next()
      } else {
        // 如果,hash中不包含令牌，包含错误信息，跳转登录界面，去认证服务器认证
        if ((tokenMap.get('access_token') == null && tokenMap.get('error') == null)) {
          // let authUri = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_AUTH_METHOD
          // // 跳转到鉴权中心登录
          // window.location.href = authUri
          //  登录页面
          router.push('/login')
        } else {
          // 登录授权失败
          router.push({path: '/loginError?errorDescription=' + tokenMap.get('error_description')})
        }
      }
    }
  }
  // 检查是否有hash值并放入cookie
  function checkAndDealHashToken () {
    // <1> 获取 location 中的hash信息，也就是 #后边的内容
    let tokenStr = location.hash
    // 存储令牌信息
    let tokenMap = new Map()
    // 默认失败
    tokenMap.set('success', false)
    // 清除hash值，不然无限循环
    if (tokenStr !== null && tokenStr !== '') {
      // 有hash值需要清理
      tokenMap.set('success', true)
      // 去除第一个#号
      if (tokenStr.startsWith('#')) {
        tokenStr = tokenStr.replace('#', '')
        if (tokenStr != null && tokenStr !== undefined && tokenStr !== '') {
          // 通过&符号分割
          let tokenArray = tokenStr.split('&')
          // 转为key存储形式
          tokenArray.forEach(str => {
            let strArr = str.split('=')
            tokenMap.set(strArr[0], strArr[1])
          })
          // token放置到cookie
          if (tokenMap.get('access_token') != null) {
            let token = Cookies.get('token')
            // token不相等，重新替换
            if (tokenMap.get('access_token') !== token) {
              // 存储
              Cookies.set('token', tokenMap.get('access_token'))
            }
          }
        }
      }
    } else {
      let token = Cookies.get('token')
      if (token === null || token === undefined) {
        // 写死一个token测试用
        // Cookies.set('token', '0c8bd9de-e710-4c9d-a66b-211db326480d')
        // 本地token
        // Cookies.set('token', '07406a7a-2e56-4ca9-ac37-8624985ac19f')
      }
    }
    // 放入cookie中的token到map中
    tokenMap.set('token', Cookies.get('token'))
    return tokenMap
  }
})

router.afterEach(() => {
  NProgress.done()
})
