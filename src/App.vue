<template>
  <div id="app">
    <!--缓存页面-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <!--不缓存页面-->
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>
export default {
  components: {
  }
}
</script>
