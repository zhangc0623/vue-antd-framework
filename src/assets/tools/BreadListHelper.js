/**
 * 面包屑导航工具类
 */
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
// 项目管理工具类
export default {
  /**
   * 将面包屑导航放入cookie中
   * @param breadList
   */
  setBreadListToCookie (breadList) {
    Cookies.set('breadList', JSON.stringify(breadList))
  },
  /**
   * 取出cookie中的面包屑导航
   * @return {*}
   */
  getBreadListInCookie (){
    return JSON.parse(Cookies.get('breadList'))
  },
  /**
   * 获取当前面包屑导航值
   * @return {default.props.breadList|{default, type}|string|getters.breadList|Array|default.computed.breadList|*}
   */
  getBreadList () {
    return store.getters.breadList
  },
  /**
   * 面包屑导航增加一条
   * @param breadItem
   */
  addBreadList (breadItem){
    // 改变面包屑导航值
    let breadList = this.getBreadList()
    breadList.push(breadItem)
    store.dispatch('app/updateBreadList', breadList)
    this.setBreadListToCookie(breadList)
  },
  /**
   * 改变工作台的菜单
   * @param breadItem
   */
  changeMenuBread (breadItem) {
    // 改变面包屑导航值
    store.dispatch('app/updateBreadList', breadItem)
  },
  /**
   * 面包屑导航回退方法
   */
  menuGoBack () {
    let breadList = this.getBreadList()
    if (!breadList) {
      // store中没有导航值，取cookie中的
      breadList = this.getBreadListInCookie()
    }
    let path
    // 面包屑list删除最新导航
    breadList.pop()
    store.dispatch('app/updateBreadList', breadList)
    path = breadList[breadList.length - 1].path
    let query = {}
    if (breadList[breadList.length - 1].query) {
      query = breadList[breadList.length - 1].query
    }
    // 路由跳转
    router.push({
      path: path,
      query: query
    })
  },
}
