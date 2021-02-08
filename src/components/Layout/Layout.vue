<template>
  <div class="dk_layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <DKHeader />
      <a-layout class="ly--c-r-ctn">
        <DKSider/>
        <a-layout>
          <DKTab menuType="studio"></DKTab>
          <DKContent></DKContent>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import DKHeader from './modules/DKHeader'
import DKSider from './modules/DKSider'
import DKContent from './modules/DKContent'
import DKTab from './modules/DKTab'
export default {
  name: 'Layout',
  components: {
    DKHeader,
    DKSider,
    DKContent,
    DKTab
  },
  mounted () {
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.dk_layout {
  height: 100vh;
  .ly--c-r-ctn {
    height: calc(100vh - 52px);
  }
}
</style>
