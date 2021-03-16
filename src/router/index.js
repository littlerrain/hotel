//路由文件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'


const router = new Router({
  // 注册应用中所有的路由
  routes: [{
      path: '/home',
      name:'home',
      component: Home
    }, 
    {
      path: '/login',
      name:'login',
      component: Login
    },
    {
      path: '/register',
      name:'register',
      component: Register
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
export default router