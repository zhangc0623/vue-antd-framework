<template>
  <a-breadcrumb>
    <template v-for="(page, pageIndex) in breadList">
      <a-breadcrumb-item :key="pageIndex" v-if="pageIndex === 0">
        <a @click="goBack">{{ page.title }}</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item :key="pageIndex" v-else>
        <span>{{ page.title }}</span>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script>
import BreadListHelper from '@/assets/tools/BreadListHelper'
import MenuLists from '@/assets/jsons/menuLists'
export default {
  name: 'Breadcrumb',
  props: {
    breadList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {}
  },
  methods: {
    // 回退方法
    goBack () {
      BreadListHelper.menuGoBack()
    },
    // 根据url的path初始化面包屑
    initBreadList () {
      let path = this.$route.path
      let menuList = MenuLists['menu']
      menuList.forEach(item => {
        if (item.path === path) {
          let breadItem = [
            {
              title: item.menuName,
              path: item.path
            }
          ]
          BreadListHelper.changeMenuBread(breadItem)
          // 更新app/updateMenu
          this.$store.dispatch('app/updateMenu', path)
        }
      })
    }
  },
  created () {
    this.initBreadList()
  }
}
</script>

<style lang="less" scoped>
.ant-breadcrumb {
  padding: 10px 0;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.5px;
  color:#666666;
  > span.notNow {
    display: inline-block;
    cursor: pointer;
    a {
      color: #666666 !important;
      text-decoration: none;
    }
  }
  > span.dy-dd {
    color: #666666;
  }
  > .now-breadcrumb {
    display: inline-block;
    cursor: default;
    color: #ccc !important;
  }
}
</style>
