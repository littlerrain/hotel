<template>
  <div id="deal">
    <div class="beforFix" :class="{fixed:showFlag}">
      <ul class="nav-tabs clearfix">
        <div>
          <li :class="{current:showColor}" style="margin-left:0">
            <a href="#deal">房型预订</a>
          </li>
          <li :class="{current:!showColor}">
            <a href="#info">酒店信息</a>
          </li>
          <div v-show="showFlag" style="vertical-align: middle;margin-top: 5px;height: 55px;float: right;margin-right:70px;">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="toDays"
          ></el-date-picker>
          <span>共{{days}}晚</span>
          </div>
        </div>
      </ul>
    </div>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="toDays"
    ></el-date-picker>
    <span>共{{days}}晚</span>
    <div style="height:500px;margin: 0 20px;">
      <ul class="deal-table">
        <li class="showli clear">
          <div class="liDiv1">
            <img src="https://p0.meituan.net/175.0/tdchotel/62c228d2c65086954b8ab46af8fac8a51029880.jpg" src2="http://p0.meituan.net/175.0/tdchotel/62c228d2c65086954b8ab46af8fac8a51029880.jpg" width="128px" height="80px" style="border-radius: 2px;">
          </div>
          <div style="float:right;margin-right:100px;border:2px solid #fe8c00">
            <div style="padding: 5px;float: right;font-weight:300;font-size: 12px;cursor:pointer;color:#fe8c00;" @click="bookIn()">预订房间</div>
          </div>
          <div class="book-info">
            <ul class="ulBook">
              <li style="font-weight: 700;display: inline-block;margin-bottom: 15px;color: #333;font-size: 18px;">大床房</li>
              <div class="bookDiv"> 38-46㎡ 大床 有窗</div>
              <li class="clear" style="padding-bottom:16px;"></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <h2 id="info">酒店信息</h2>
    <div class="clearfix" style="width: 100%;background:#fff;border: 1px solid #e5e5e5;border-radius: 4px;">
      <div class="clearfix" style="border-bottom: none;line-height: 20px;font-size: 12px;color: #666;">
        <div class="table_content clear">
          <dt class="poi-hotelinfo-title">联系方式</dt>
          <dd
            style="position: relative;min-height: 1px;padding-right: 18px;float: left;max-width:85%;"
          >
            <span>666-8888888</span>
          </dd>
        </div>
        <div class="table_content clear">
          <dt class="poi-hotelinfo-title">酒店信息</dt>
          <dd
            style="position: relative;min-height: 1px;padding-right: 18px;float: left;max-width:85%;"
          >
            <span>2021年开业 2021年装修</span>
          </dd>
        </div>
        <div class="table_content clear">
          <dt class="poi-hotelinfo-title">酒店简介</dt>
          <dd
            style="position: relative;min-height: 1px;padding-right: 18px;float: left;max-width:85%;"
          >
            <span>酒店地处广东财经大学附近，临近既是广东财经大学南门堕落街，举步可至堕落街吃吃喝喝，邻近广州地铁八号线新港东站，短短十分钟即可到达新港东。酒店共占地3000平方米，拥有独特的艺术气息与风情，为宾客带来独特的传统文化及艺术品味及享受，是商旅宾客的下榻选择。酒店拥有各类独特风格的客房与套房，客房内提供网络、进口洗浴用品等，住宿环境优越。酒店致力传承传统的艺术及文化，为宾客带来近乎优质的享受。</span>
          </dd>
        </div>
        <div class="table_content clear">
          <dt class="poi-hotelinfo-title">酒店政策</dt>
          <dd
            style="position: relative;min-height: 1px;padding-right: 18px;float: left;max-width:85%;"
          >
            <span>入住时间: 14:00以后 离店时间: 12:00之前</span>
          </dd>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer";
export default {
  props:["message"],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() + 24 * 60 * 60 * 1000 * 30 ||
            time.getTime() < Date.now() - 8.64e7
          );
        }
      },
      value1: "",
      days: 0,
      showFlag: false,//日期的切换
      showColor: true,//地址的切换
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  components: {
    Footer
  },
  methods: {
    toDays() {
      var oDate = new Date(); // 获取当前日期时间
      var month = this.value1[0].getMonth() + 1; // 表示当前月份的变量
      var year = oDate.getFullYear(); //通过时间来获取年份
      var newDate = new Date(year, month - 1, 32); // 根据月份设置日期
      var day = 32 - newDate.getDate(); // 根据设置的日期来获取当前月份的天数。
      if (this.value1[0].getMonth() + 1 === this.value1[1].getMonth() + 1) {
        this.days = this.value1[1].getDate() - this.value1[0].getDate();
      } else {
        this.days = this.value1[1].getDate() - this.value1[0].getDate() + day;
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 500) {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
      if(scrollTop<903){
        this.showColor = true;
      }else{
        this.showColor = false;
      }
    },
    bookIn(){
      if(this.$props.message){
        //跳转到订单页面，并获取到当前的用户
      }else{
        //提示请先登录，然后再跳转到登录界面
        this.$message({message: '请先登录',type: 'warning'});
        this.$router.push('/login')

      }
    }
  }
};
</script>

<style scoped>
.nav-tabs {
  width: 100%;
  height: 63px;
  box-shadow: none;
  transition: none;
  border-bottom: 1px solid #e5e5e5;
  margin: 0 20px;
}

.nav-tabs li {
  float: left;
  text-align: center;
  margin: 0 25px;
}

.nav-tabs li a {
  position: relative;
  display: block;
  color: #666;
  text-decoration: none;
  font-size: 16px;
  line-height: 62px;
}

.nav-tabs li.current a {
  color: #ffc300;
  text-decoration: none;
  border-bottom: 2px solid #ffc300;
}
.beforFix {
  margin-top: 10px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.table_content {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.poi-hotelinfo-title {
  color: #222;
  font-weight: 700;
  margin-right: 10px;
  width: 55px;
  clear: left;
  position: relative;
  min-height: 1px;
  padding-right: 18px;
  float: left;
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
.fixed .nav-tabs {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  min-width: 960px;
  padding: 10px 50px 0;
  margin: 0 auto;
  box-shadow: 0 1px 4px 0;
}

.deal-table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0;
    border-collapse: collapse;
    border-spacing: 0;
}

.showli{
  padding-top: 30px;
  border-top: 1px solid #e5e5e5;
}

.liDiv1{
  float: left;
  position:relative;
}
.ulBook{
  width: 600px;
    line-height: 24px;
    margin-left: 143px;
}
.bookDiv{
  white-space: nowrap;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    height: 20px;
    font-size: 12px;
}
</style>