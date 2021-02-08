<template>
  <div style="text-align: center">
    <div slot="image">
      <!-- <i class="iconfont icon-icon-404-icon" /> -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-404"></use>
      </svg>
    </div>
    <div slot="content">
      <div class="content">
        <h3>授权登录错误</h3>
        <p class="desc">
          {{this.$route.params.errorDescription}}
        </p>
        <router-link to="/home">返回首页</router-link>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'LoginError ',
  data () {
    return {
      errorDescription: this.$route.params.errorDescription
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .dk_login {
    display: flex;
    align-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;

    .dk_login_content {
      margin: -30vh auto 0 auto;
      padding: 20px;
      width: 428px;
      max-width: 80%;
      // background: #fff;
      h3 {
        height: 8vh;
        line-height: 8vh;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-size: 3vh;
        letter-spacing: 1px;
        font-weight: 600;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      }

      .btn_area {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
      }
    }
  }
</style>
