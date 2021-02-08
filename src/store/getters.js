/**
 * @Author
 * @Date 2019/5/29
 * @Desc
 */
const getters = {
  // 存储当前设备是pc还是mobile
  device: state => state.app.device,
  // 存放菜单的缩放值
  collapsed: state => state.app.collapsed,
  setting: state => state.app.setting,
  // 存放菜单的path
  menuPath: state => state.app.menuPath,
  // 存放当前语言
  language: state => state.app.language,
  // 存放当前iframe框架url
  iframeUrl: state => state.app.iframeUrl
}

export default getters
