// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './components/Login'

import router from './router' //路由

import ElementUI from 'element-ui' //ui组件
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:3000';
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
