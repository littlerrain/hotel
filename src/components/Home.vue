<template>
  <div style="margin-left:30px;">
    <div style="width:990px;height:443px;">
      <div class="header">
        <div class="clear" style="position:relative;">
          <span class="title">广州和谐大酒店</span>
          <div class="hotel-type" style="float:left;">
            <span style="color: #999;font-size: 12px;">豪华型</span>
          </div>
          <span v-if="!this.user" style="float:right;cursor:pointer;" @click="loadin()">登陆</span>
          <span v-else style="float:right;" >{{this.user.UserName}}</span>
        </div>
        <div style="font-size: 12px;margin-bottom: 10px;">
          <span style="color: #ffc300;">[广东财经大学]</span>
          <span>广东省广州市海珠区中约曾园八十八巷88</span>
        </div>
      </div>
      <div style="position:relative;height:380px;max-width:1190px;">
        <div style="width:63.2%;height:100%;float:left;">
          <div style="width:100%;min-height: 270px;max-width: 752px;overflow: hidden;">
            <img src="../assets/1.jpg" alt width="1000" height="380" />
          </div>
        </div>
        <ul
          style="height:100%;position: relative;width: 35.6%;background: #fff;border: 1px solid #e5e5e5;border-radius: 4px;float: right;"
        >
          <li
            style="height: 115px;margin: 0 20px;border-bottom: 1px solid #e5e5e5;list-style:none;"
          >
            <div class="fen">
              <span style="font-size:34px;font-weight:500;padding-right:2px;">4.7</span>分
            </div>
            <div
              style="margin-left: 11px;float: left;line-height: 115px;color: #f90;font-size: 16px;"
            >很好</div>
          </li>
          <li class="li2">
            <div
              style="color: #666;line-height: 20px;margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;"
            >
              <span>2021年开业</span>
              <span>2021年装修</span>
            </div>
            <div style="color: #666;margin-bottom: 10px;">电话：666-8888888</div>
            <ul style="overflow: hidden;white-space: nowrap;height: 53px;">
              <li class="li3">
                <div>
                  <i class="el-icon-success"></i>
                </div>
                <div style="color:#999;font-size:12px">无线上网</div>
              </li>
              <li class="li3">
                <div>
                  <i class="el-icon-user"></i>
                </div>
                <div style="color:#999;font-size:12px">免费停车</div>
              </li>
              <li class="li3">
                <div>
                  <i class="el-icon-phone"></i>
                </div>
                <div style="color:#999;font-size:12px">餐厅</div>
              </li>
              <li class="li3">
                <div>
                  <i class="el-icon-more"></i>
                </div>
                <div style="color:#999;font-size:12px">接送服务</div>
              </li>
              <li class="li3">
                <div>
                  <i class="el-icon-plus"></i>
                </div>
                <div style="color:#999;font-size:12px">行李寄存</div>
              </li>
              <li class="li3">
                <div>
                  <i class="el-icon-error"></i>
                </div>
                <div style="color:#999;font-size:12px">租车服务</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <HelloWorld :message="this.user"/>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld";
export default {
  name: "app",
  data() {
    return {
      user:null,
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
    };
  },
  components: {
    HelloWorld
  },
  mounted () {
    if(sessionStorage.getItem("user")){
      var test = sessionStorage.getItem("user");
      this.user = JSON.parse(sessionStorage.getItem("user"))
    }
  },
  methods: {
    loadin() {
      this.$router.push('/login')
    },
  }
};
</script>

<style>
.hotel-type {
  text-indent: 20px;
  height: 37px;
  line-height: 37px;
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.title {
  font-weight: 700;
  float: left;
  color: #333;
  font-size: 26px;
}
.fen {
  border: 2px dotted #f90;
  border-radius: 50%;
  height: 87px;
  width: 87px;
  float: left;
  line-height: 87px;
  text-align: center;
  color: #f90;
  margin: 12px 0 0;
}

.li2 {
  margin: 20px;
  color: #666;
  font-size: 14px;
}

.li3 {
  width: 60px;
  height: 46px;
  margin: 5px 10px 0;
  float: left;
  text-align: center;
}

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
</style>
