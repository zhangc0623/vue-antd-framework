/**
 * 基础工具类
 */
import Cookies from 'js-cookie'
export default {
  /**
   * 获取token
   * @return {*}
   */
  getToken () {
    return Cookies.get('token')
  },
  /**
   * 移除token
   */
  removeToken () {
    Cookies.remove('token')
  },
  getTokenHeaders () {
    let token = Cookies.get('token')
    let header = {}
    if(token){
      header = { Authorization: 'Bearer ' + Cookies.get('token') }
    }
    return header
  },
  logout () {
    window.location = '/logout/' + this.getToken()
    this.removeToken()
  }
}
