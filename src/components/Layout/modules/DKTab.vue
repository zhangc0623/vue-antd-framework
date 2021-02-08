<template>
  <div class="myTags">
    <!--面包屑导航-->
    <div class="BreadList">
      <Breadcrumb :breadList="bread" :menuType="menuType" />
    </div>
  </div>
</template>

<script>
// 面包屑管理工具类
import BreadListHelper from '@/assets/tools/BreadListHelper'
export default {
  name: 'DKTab',
  props: {
    // 菜单类型
    menuType: {
      default: 'studio'
    },
  },
  data () {
    return {
      bread: [],
    }
  },
  computed: {
    breadList () {
      return this.$store.getters.breadList
    }
  },
  watch: {
    breadList () {
      this.bread = this.$store.getters.breadList
    }
  },
  created () {
    this.bread = BreadListHelper.getBreadListInCookie()
  }
}
</script>
<style scoped>
  .myTags{
    background-color: #fff;
  }
  .BreadList{
    margin: 0 40px;
  }
</style>
