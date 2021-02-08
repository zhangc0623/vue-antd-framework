/**
 * @Author
 * @Date 2019/5/29
 * @Desc
 */
const getters = {
  // 存放菜单的缩放值
  setting: state => state.app.setting,
  // 存放主菜单的path
  menuPath: state => state.app.menuPath,
  // 存放面包屑值
  breadList: state => state.app.breadList,
}

export default getters
