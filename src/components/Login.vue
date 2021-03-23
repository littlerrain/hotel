<template>
  <div class="login">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="Tel">
        <el-input type="text" placeholder="请输入手机号" v-model="form.UserTel" />
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input type="password" placeholder="请输入密码" v-model="form.Password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button type="primary" v-on:click="toRegister()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        UserTel: "",
        Password: ""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        UserTel: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        Password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },
    };
  },
  methods: {
    onSubmit(formName) {
      var _this = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          console.log("登陆了", this.form);
          this.$http
            .post("/selectUser", this.form)
            .then(function(res) {
              console.log(res);
              if (!res.data.length) {
                _this.$message.error("账号密码输入错误，清重新输入");
              } else {
                _this.$message({
                  message: "欢迎光临，" + res.data[0].UserName,
                  type: "success"
                });
                sessionStorage.setItem("user", JSON.stringify(res.data[0]));
                _this.$router.push('/home')
              }
            })
            .catch(error => console.log(error));
        } else {
          _this.$message.error("输入账号密码不得为空.");
        }
      });
    },
    toRegister(){
        this.$router.push('/register')
    }
  }
};
</script>

<style>
.login{
  width: 100%;
  height: 100%;
  background-image: url(../assets/login-bg.jpg);
  background-size: 100%;
  position: relative;
  top: 0;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  margin-top: 0;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background: white;
    position: relative;
    top: 180px;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>