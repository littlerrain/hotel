<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">酒店管理系统后台登录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view" ></i>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%" @click.native.prevent="login">
          登 录
        </el-button>
      </el-form-item>
      <div class="tips">

      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate.js'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      pwdType: 'password',
      loading: false,
    }
  },
  methods : {
    showPwd() {
      this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
      let e = document.getElementsByClassName('el-icon-view')[0];
      this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
    },
    login() {
      let _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const username = this.loginForm.username.trim()
          this.loading = true
          // login(this.loginForm).then(response => {
          //     const res = response;
          //   if (res.code === 1000){
          //     Cookies.set('admin_name', username)
          //       Cookies.set('session_id', res.data.sessionId)
          //       Cookies.set('admin_id', res.data.userId)
          //       Cookies.set('role', res.data.role)
          //     this.$router.push({ path: this.redirect || '/' })
          //   }
          //   else{
          //     this.$message.warning("用户名或密码错误！请检查后再试")
          //   }
          // }).finally(() => {
          //   this.loading = false
          // })
          _this.$message.success("登录成功");
          this.loading = false
          this.$router.push("/home");
        } else {
          console.log('error submit!!')
        }
        this.loading = false
      })

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less">

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

}

</style>

<style lang="less" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
