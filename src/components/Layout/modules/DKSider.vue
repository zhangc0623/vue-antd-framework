<template>
  <a-layout-sider
    :trigger="null"
    theme="light"
    class="dk_sider"
    width="200"
  >
    <a-menu
      class="ly-ctn-menu"
      theme="light"
      mode="inline"
      :defaultSelectedKeys="[activeMenu]"
      :selectedKeys="[activeMenu]"
      :inlineIndent="10"
    >
      <template v-for="menu in menuLists">
        <!--无二级目录-->
        <a-menu-item
          :key="menu.key"
          v-if="isNull(menu.children)"
          @click="changeMenu(menu)"
        >
          <router-link :to="menu.path">
            <a-icon :type="menu.icon" />
            <span>{{ menu.menuName }}</span>
          </router-link>
        </a-menu-item>
        <!--有二级节点-->
        <a-sub-menu
          :key="menu.key"
          v-else
        >
          <span
            slot="title"
            @click="changeMenu(menu)"
          >
            <a-icon :type="menu.icon" />
            <span>{{ menu.menuName }}</span>
          </span>
          <template v-for="childItem in menu.children">
            <!--无三级目录-->
            <a-menu-item
              :key="childItem.key"
              v-if="isNull(childItem.children)"
              @click="changeMenu(menu,childItem.key)"
            >
              <router-link :to="menu.path">
                {{childItem.menuName}}
              </router-link>
            </a-menu-item>
            <!--有三级目录-->
            <a-sub-menu
              :key="childItem.key"
              v-else
            >
              <span
                slot="title"
                @click="changeMenu(menu,childItem.key)"
              >
                <span>{{ childItem.menuName }}</span>
              </span>
              <template v-for="child2Item in childItem.children">
                <a-menu-item
                  :key="child2Item.key"
                  @click="changeMenu(menu,childItem.key,child2Item.key)"
                >
                  <router-link :to="menu.path">
                    {{child2Item.menuName}}
                  </router-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuLists from '@/assets/jsons/menuLists'
// 项目管理工具类
import BreadListHelper from '@/assets/tools/BreadListHelper'
export default {
  name: 'DKSider',
  props: {},
  computed: {
    ...mapGetters(['menuPath', 'language'])
  },
  data () {
    return {
      showTip: true,
      menuLists: [],
      // 聚焦菜单
      activeMenu: ''
    }
  },
  methods: {
    // 字符串判空
    isNull (str) {
      if (str != null && str !== undefined && str !== '') {
        return false
      } else {
        return true
      }
    },
    /* 改变目录 */
    changeMenu (menu, key1, key2) {
      let tagMenu = menu
      // 存储面包屑导航菜单
      let breadList = []
      let path = menu.key
      // 面包屑导航赋值一级菜单
      breadList.push({
        title: menu.menuName,
        path: menu.path
      })
      // 若当前点击目录存在子目录
      if (menu.children !== undefined) {
        for (let i = 0; i < menu.children.length; i++) {
          const childItem = menu.children[i]
          if (key1 === childItem.key) {
            // 面包屑导航赋值二级菜单
            breadList.push({
              title: childItem.menuName,
              path: childItem.path
            })
            tagMenu = childItem
            path = childItem.key
            // 若点击目录的子目录存在子目录
            if (childItem.children !== undefined) {
              for (let j = 0; j < childItem.children.length; j++) {
                const child2Item = childItem.children[j]
                // 面包屑导航赋值三级菜单
                if (key2 === child2Item.key) {
                  breadList.push({
                    title: child2Item.menuName,
                    path: child2Item.path
                  })
                  tagMenu = childItem
                  path = child2Item.key
                }
              }
            }
          }
        }
      }
      if (tagMenu.path) {
        // 改变面包屑导航值
        BreadListHelper.changeMenuBread(breadList)
        // 更新app/updateMenu
        this.$store.dispatch('app/updateMenu', path)
      }
      try {
        let dom = document
          .getElementsByClassName('ly-ctn-menu')[0]
          .getElementsByClassName('ant-menu-submenu')
        for (let c = 0; c < dom.length; c++) {
          let className = dom[c].getAttribute('class')
          className = className.replace('ant-menu-submenu-open', '')
        }
      } catch (e) {
        throw new Error('查询菜单错误')
      }
    }
  },
  watch: {
    menuPath (newVal) {
      if (newVal.substr(0, 1) === '/') {
        newVal = newVal.replace('/', '')
      }
      this.activeMenu = newVal
    },
  },
  created () {
    this.menuLists = MenuLists['menu'] ? MenuLists['menu'] : []
    this.activeMenu = this.menuPath
    if (this.menuPath.substr(0, 1) === '/') {
      this.activeMenu = this.menuPath.replace('/', '')
    }
  }
}
</script>
<style lang="less" scoped>
  .dk_sider {
    height: calc(100vh - 50px);
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);
    z-index: 2;
    .ly-ctn-menu {
      height: calc(100vh - 48px);
    }
  }
</style>
