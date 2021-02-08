<template>
  <a-layout-header class="dk-header">
    <div class="left-div">
      <img class="logo-img" src="http://iotx-aep-img-prod-oxs.oss-cn-shanghai.aliyuncs.com/operation/1611557722166_65873895.jpg">
      <h5>有限公司</h5>
    </div>
    <!--右侧信息-->
    <div class="right-div">
      <a-dropdown>
        <span>{{username}}<a-icon type="down" style="margin-left: 8px;"/></span>
        <a-menu slot="overlay">
          <a-menu-item key="1" style="color: #606266;cursor: text;">更改密码</a-menu-item>
          <a-menu-item key="2" @click="logout" style="color: #1890FF;">{{ $t("logout") }}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import LoginHelper from '@/assets/tools/LoginHelper'
import axios from 'axios'
export default {
  name: 'DKHeader',
  data () {
    return {
      username: 'zhangc'
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    /* 退出登录 */
    logout () {
      LoginHelper.logout()
    }
  }
}
</script>
<style lang="less" scoped>
  .dk-header {
    display: flex;
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.08);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);
    background-color: white;
    z-index: 2;
    position: relative;
  }
  .left-div{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .logo-img{
    display: block;
    height: 32px;
  }
  .left-div h5 {
    font-size: 14px;
    color: #333;
    margin: 0 0 0 16px;
    font-weight: 500;
  }
  .right-div{
    position: absolute;
    right: 20px;
  }
  .right-user-name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
