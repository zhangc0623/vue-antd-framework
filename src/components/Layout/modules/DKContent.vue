<template>
  <a-layout-content class="sys_container">
    <keep-alive :include="tagList">
      <router-view class="mb10 content" v-if="isRouterAlive">
      </router-view>
    </keep-alive>
    <DKFooter class="footer" />
  </a-layout-content>
</template>

<script>
import DKFooter from './DKFooter'
export default {
  name: 'DKContent',
  components: {
    DKFooter
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      tagList: [],
      isRouterAlive: true
    }
  },
  methods: {
    // 获取浏览器尺寸
    getWindowSize () {
      sessionStorage.setItem('offsetHeight', document.body.offsetHeight + '')
      sessionStorage.setItem('offsetWidth', document.body.offsetWidth + '')
    },
    timestamp () {
      return Date.parse(new Date())
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    this.$bus.on('addKeepLive', tagName => {
      let isExist = this.tagList.some(item => {
        return tagName === item
      })
      if (!isExist) {
        this.tagList.push(tagName)
      }
    })
    this.$bus.on('removeKeepLive', tagName => {
      let moveIndex = -1
      let isExist = this.tagList.some((item, index) => {
        let isExist = tagName === item
        if (isExist) {
          moveIndex = index
        }
        return isExist
      })
      if (isExist && moveIndex !== -1) {
        this.tagList.splice(moveIndex, 1)
      }
    })
    // 检测浏览器尺寸变化
    window.addEventListener('resize', this.getWindowSize)
    this.getWindowSize()
  },
  beforeDestroy () {
    this.$bus.off('addKeepLive')
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowSize)
  }
}
</script>

<style lang='less' scoped>
  .sys_container {
    position: relative;
    overflow: auto;
    background: white;
    margin: 8px;
    padding: 24px 24px 0;
  }
</style>
