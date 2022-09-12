import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import utils from '../utils/utils'
import { getPermissionListAPI } from '../api'
const modules = import.meta.glob('../views/*.vue')


const routes = [
    {
        name: 'home',
        path: '/home',
        meta: {
            title: '首页'

        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎'

                },
                component: () => import('../views/Welcome.vue'),
            },
            {
                name: 'user',
                path: '/system/user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/User.vue'),
            },
            {
                name: 'menu',
                path: '/system/menu',
                meta: {
                    title: '菜单管理'
                },
                component: () => import('../views/Menu.vue'),
            },
            {
                name: 'role',
                path: '/system/role',
                meta: {
                    title: '角色管理'
                },
                component: () => import('../views/Role.vue'),
            },
            {
                name: 'dept',
                path: '/system/dept',
                meta: {
                    title: '部门管理'
                },
                component: () => import('../views/Dept.vue'),
            },
            {
                name: 'leave',
                path: '/audit/leave',
                meta: {
                    title: '休假申请'
                },
                component: () => import('../views/Leave.vue'),
            },
            {
                name: 'approve',
                path: '/audit/approve',
                meta: {
                    title: '待审批'
                },
                component: () => import('../views/Approve.vue'),
            }


        ]

    },
    {
        name: 'login',
        path: '/',
        meta: {
            title: '登录'
        },
        component: () => import('../views/Login.vue'),
    },
    {
        name: '404',
        path: '/404',
        meta: {
            title: '页面丢失'
        },
        component: () => import('../views/404.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



function checkPermission(path) {
    let hasPermission = router.getRoutes().filter(route => route.path == path).length
    if (hasPermission) {
        return true
    } else {
        return false
    }
}

router.beforeEach((to, from, next) => {
    if (checkPermission(to.path)) {
        document.title = to.meta.title
        next()
    } else {
        next('/404')
    }

})

export default router