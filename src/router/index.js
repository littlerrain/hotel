//路由文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
import Home from '../components/Home'

Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
      { // 一般路由
        path: '/login',
        component: login
      },
      { // 一般路由
        path: '/home',
        component: Home
      },
      { // 自动跳转路由
        path: '/', 
        redirect: '/login'
      }
    ]
})

export default router