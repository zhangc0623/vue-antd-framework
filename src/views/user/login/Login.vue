<template>
  <div class="Gradient">
    <div class="WhiteAlpha">
      <div class="Main">
        <img class="logo" src="@/assets/images/login/logo.png" alt="收入结算中心">
        <div class="FormArea">
          <div class="Contents"></div>
          <div class="login_title">账号登录</div>
          <a-form
            id="components-form-demo-normal-login"
            :form="loginForm"
            class="login-form"
            @submit="loginSubmit">
            <ul class="ulhide">
              <li>
                <a-form-item>
                  <a-input
                    size="large"
                    autocomplete="off"
                    v-decorator="[
                    'account',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入用户名!'
                        }
                      ]
                    }
                  ]"
                    placeholder="请输入用户名"
                  >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                  </a-input>
                </a-form-item>
              </li>
              <li>
                <a-form-item>
                  <a-input-password
                    size="large"
                    v-decorator="[
                    'password',
                    {
                      rules: [
                        { required: true, message: '请输入密码！' }
                      ]
                    }
                  ]"
                    placeholder="请输入密码"
                  >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                  </a-input-password>
                </a-form-item>
              </li>
              <li>
                <a-form-item>
                  <a-input
                    size="large"
                    autocomplete="off"
                    style="width: 160px;"
                    v-decorator="[
                    'captcha',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入验证码!'
                        }
                      ]
                    }
                  ]"
                    placeholder="请输入验证码"
                  >
                    <a-icon slot="prefix" type="issues-close" style="color: rgba(0,0,0,.25)"/>
                  </a-input>
                  <img :src="captchaImg" @click="getCaptcha" alt="验证码" title="点击更换图片" style="min-width: 120px;width: 120px;height: 38px;margin-left: 8px;margin-top: -5px;cursor: pointer;"/>
                </a-form-item>
              </li>
              <li>
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                    size="large"
                    block
                    :loading="submitLoading">登 录
                  </a-button>
                </a-form-item>
              </li>
            </ul>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
export default {
  name: 'Login',
  data () {
    return {
      loginForm: this.$form.createForm(this),
      captchaImg: process.env.VUE_APP_BASE_URL + '/iotSettIncome/captcha.jpg' + '?' + Math.random(),
      submitLoading: false
    }
  },
  created () {
  },
  methods: {
    /* 获取验证码图片 */
    getCaptcha () {
      this.captchaImg = process.env.VUE_APP_BASE_URL + '/iotSettIncome/captcha.jpg' + '?' + Math.random()
    },
    /* 点击登录 */
    loginSubmit (e) {
      e.preventDefault()
      this.loginForm.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true
          this.$post('/iotSettIncome/login', values).then(res => {
            if (res.code === 200) {
              this.$Cookies.set('token', res.data.token)
              this.$router.push('/')
            } else {
              this.$message.error(res.msg)
            }
          })
            .finally(() => {
              this.submitLoading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../../assets/css/login/login.css');
</style>
