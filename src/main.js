// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.less' // global css
import router from './router' //路由
import echarts from 'echarts' //引入echarts 使用图表
import filter from './utils/filter'

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
for (let key in filter){
  Vue.filter(key,filter[key])
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
