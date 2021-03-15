<template>
  <div>
    <el-form ref="registerForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎注册</h3>
      <el-form-item label="账号" prop="Tel">
        <el-input type="text" placeholder="请输入手机号" v-model="form.Tel"/>
      </el-form-item>
      <el-form-item label="用户名" prop="UserName">
        <el-input type="text" placeholder="请输入用户名" v-model="form.UserName"/>
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input type="password" placeholder="请输入密码" v-model="form.Password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="Password2">
        <el-input type="password" placeholder="请确认密码" v-model="form.Password2" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="PId">
        <el-input type="password" placeholder="请输入身份证号码" v-model="form.PId" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="toLogin()">登录</el-button>
        <el-button type="primary" v-on:click="onSubmit('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Tel: "",
        Password: "",
        Password2: "",
        PId: "",
        UserName: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        Tel: [{ required: true, message: "账号不可为空", trigger: "blur" }],
        Password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
        Password2: [{ required: true, message: "确认密码不可为空", trigger: "blur" }],
        PId: [{ required: true, message: "身份证号码不可为空", trigger: "blur" }],
        UserName: [{ required: true, message: "身份证号码不可为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    onSubmit(formName) {
      var _this = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          console.log("注册了", this.form);
          this.$http
            .post("/addUser", this.form)
            .then(function(res) {
              console.log(res);
              if (!res.data) {
                _this.$message.error("插入异常，请重新注册");
              } else {
                _this.$message({
                  message: "欢迎光临",
                  type: "success"
                });
                sessionStorage.setItem("user", JSON.stringify(_this.form));
                _this.$router.push("/home");
              }
            })
            .catch(error => console.log(error));
        } else {
          _this.$message.error("输入账号密码不得为空.");
        }
      });
    },
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.el-form-item__label {
  width:100px !important;
}
.el-form-item__content{
    margin-left: 100px !important;
}
</style>