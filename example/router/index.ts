import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: 'NavPage',
        path: '/',
        meta: {
            title: '登陆',
        },
        component: () => import('../pages/NavPage.vue'),
        children: [
            {
                name: 'InputPage',
                path: '/input',
                meta: {
                    title: '输入框组件',
                },
                component: () => import('../pages/InputPage.vue'),
            },
            {
                name: 'DragablePage',
                path: '/dragable',
                meta: {
                    title: '输入框组件',
                },
                component: () => import('../pages/DragablePage.vue'),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to: any) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
})
export default router
