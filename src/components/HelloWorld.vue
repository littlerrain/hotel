<template>
  <div>
    <div style="margin-top: 10px;background: #fff;border: 1px solid #e5e5e5;border-radius: 4px;">
      <ul class="nav-tabs clearfix">
        <li class="current" style="margin-left:0"><a href="#deal">房型预订</a></li>
        <li><a href="#info">酒店信息</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-tabs {
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

.nav-tabs li.current a {
  color: #ffc300;
  text-decoration: none;
  border-bottom: 2px solid #ffc300;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>