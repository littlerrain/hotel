<template>
  <div>
      <div class="footer">
      <div class="footerlink clearfix">
        <div class="footer-column">
          <dl>
            <dt>用户帮助</dt>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">申请退款</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">常见问题</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">用户协议</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">隐私政策</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">反诈骗公告</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">消费者权益保障</a></dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>公司信息</dt>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">关于我们</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">投资者关系</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">加入我们</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">商户诚信公约</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">商户管理办法</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">保险经纪资质</a></dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>廉正举报</dt>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">廉正举报平台</a></dd>
            <dt style="margin-top:20px;">知识产权</dt>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">知识产权维权平台</a></dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>服务热线</dt>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">住店消费者：111111</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">投诉消费者：222222</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">其他消费者：333333</a></dd>
            <dd><a class="alink" rel="nofollow" href="##" target="_blank">商家合作：444444</a></dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.footer {
  width: 1190px;
  height: 200px;
  margin: 0 auto;
  color: #333;
  font-size: 12px;
  line-height: 2;
  box-sizing: border-box;
  text-align: left;
}
.footlink {
  padding: 40px 45px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.footer-column {
  width: 25%;
  float: left;
}
.footer-column dl{
      padding-bottom: 20px;
    color: #666;
    margin: 0;
}
.footer-column dl dt{
  color: #333;
    font-size: 14px;
    font-weight: 500;
}
.alink {
  text-decoration: none;
  color: #666;
  background-color: transparent;
}
.clear:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>