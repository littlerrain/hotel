import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/Dashboard.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/room',
                    component: () => import( '../components/views/Room.vue'),
                    meta: { title: '房间管理' }
                },
                {
                    path: '/roomtype',
                    component: () => import( '../components/views/RoomType.vue'),
                    meta: { title: '房间类型管理' }
                },
                {
                    path: '/user',
                    component: () => import( '../components/views/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/bookingorder',
                    component: () => import( '../components/views/Order.vue'),
                    meta: { title: '预订订单管理' }
                },
                {
                    path: '/checkdinorder',
                    component: () => import( '../components/views/User.vue'),
                    meta: { title: '入住订单管理' }
                },
                {
                    path: '/checkoutorder',
                    component: () => import( '../components/views/User.vue'),
                    meta: { title: '退房订单管理' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/views/Master.vue'),
                    meta: { title: '待办事项' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: '统计管理' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '系统管理', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/views/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
