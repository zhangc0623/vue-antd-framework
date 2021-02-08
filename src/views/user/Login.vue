<template>
  <div class="Gradient">
    <!-- logo图片 -->
    <img src="@/assets/images/login/logo.png" class="logo-img"/>
    <div class="WhiteAlpha">
      <div class="Main">
        <div>
          <div style="text-align: center;font-size: 42px;">名称</div>
          <div class="FormArea">
            <a-form-model :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
              <div class="Contents">
                <div @click="checkAccount" class="login_title"
                    :class="loginType === 'account' ? 'login_title_checked' : ''"
                    style="border-right: 1px solid #e1e1e1;">
                  <a-icon type="user" />账号密码登录
                </div>
                <div @click="checkMobile" class="login_title"
                    :class="loginType === 'mobile' ? 'login_title_checked' : ''">
                  <a-icon type="mobile" />手机登录
                </div>
              </div>
              <ul class="ul_hide">
                <!--手机登录-->
                <li v-if="loginType === 'mobile'">
                  <a-form-model-item prop="mobile">
                    <a-input size="large" autocomplete="off" placeholder="请输入手机号" v-model="loginForm.mobile">
                      <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item prop="code">
                    <a-input size="large" style="width: 170px;" v-model="loginForm.code" placeholder="请输入验证码">
                      <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                    <a style="color: #387eff;margin-left: 16px;" @click="getSMSCode">获取短信验证码</a>
                  </a-form-model-item>
                </li>
                <!--账号密码登录-->
                <li v-else>
                  <a-form-model-item prop="username">
                    <a-input size="large" autocomplete="off" placeholder="请输入用户名" v-model="loginForm.username">
                      <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item prop="password">
                    <a-input-password size="large" v-model="loginForm.password" placeholder="请输入密码">
                      <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input-password>
                  </a-form-model-item>
                  <a-form-model-item prop="captchaCode">
                    <a-input size="large" autocomplete="off" style="width: 160px;" placeholder="请输入验证码" v-model="loginForm.captchaCode">
                      <a-icon slot="prefix" type="issues-close" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                    <img :src="captchaImg" @click="getCaptcha" alt="验证码" title="点击更换图片" class="captcha-style"/>
                  </a-form-model-item>
                </li>
                <li>
                  <a-form-model-item>
                    <a-button type="primary" html-type="submit" class="login-form-button" size="large" block :loading="submitLoading" @click="loginSubmit">
                      登 录
                    </a-button>
                  </a-form-model-item>
                </li>
              </ul>
            </a-form-model>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        // 登录类型
        loginType: 'account',
        loginForm: {},
        // 表单校验规则
        loginFormRules: {
          mobile: [
            {required: true, message: '请输入手机号!'}
          ],
          code: [
            { required: true, message: '请输入验证码！'}
          ],
          username: [
            {required: true, message: '请输入用户名!'}
          ],
          password: [
            { required: true, message: '请输入密码！'}
          ],
          captchaCode: [
            {required: true, message: '请输入验证码!'}
          ]

        },
        submitLoading: false,
        // 验证码图片
        captchaImg: '',
        // 验证码内容
        captchaCodeText: '',
        captchaKey: '',
        // 项目详情
        projectInfo: {}
      }
    },
    methods: {
      checkMobile () {
        this.loginType = 'mobile'
        this.$refs.loginFormRef.resetFields()
      },
      checkAccount () {
        this.loginType = 'account'
        this.$refs.loginFormRef.resetFields()
      },
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .Gradient {
    background: linear-gradient(-180deg,#79b2ff 10%,#69acff 100%);
    // background: url(http://iotx-aep-img-prod-oxs.oss-cn-shanghai..com//1612267861168_22903824.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .logo-img {
    margin-top: 20px;
    margin-left: 20px;
    height: 22px;
  }
  .WhiteAlpha {
    width: 100%;
    height: 454px;
    position: absolute;
    top: 50%;
    margin: -227px 0 0 ;
  }
  .Main {
    width: 1080px;
    height: 454px;
    // background: url('../../assets/images/login_img.png') no-repeat;
    margin: 0 auto;
    position:relative;
    display: flex;
    justify-content: center;
  }
  .Main .logo{
    width: 374px;
    height: 64px;
    position: absolute;
    top: -124px;
    left: -60px;
  }
  .FormArea {
    width: 450px;
    height: 360px;
    margin-top: 22px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 0px 20px rgba(11,166,192,.2);
    background: #FFF;
  }
  .FormArea li {
    width: 290px;
    position: relative;
    margin: 0 auto;
    text-align: left;
  }
  .Contents {
    border-bottom: 1px solid #e1e1e1;
  }
  .login_title{
    font: 16px/150% microsoft yahei,helvetia,pingfang sc,Arial,Tahoma;
    padding: 16px;
    display: inline-block;
    width: 50%;
    cursor:pointer;
  }
  .login_title_checked{
    color: #387eff;
  }
  .ul_hide,
  .ul_hide ul{
    margin: 32px auto;
    padding: 0;
    list-style: none;
  }
  .captcha-style{
    min-width: 120px;
    width: 120px;
    height: 38px;
    margin-left: 8px;
    margin-top: -5px;
    cursor: pointer;
  }
</style>
