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
                path: '',
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
            },
            {
                name: 'IdentifyPage',
                path: '/identify',
                meta: {
                    title: '身份认证',
                },
                component: () => import('../pages/IdentifyPage.vue'),
            },
            {
                name: 'TreePage',
                path: '/tree',
                meta: {
                    title: '树结构',
                },
                component: () => import('../pages/TreePage.vue'),
            },
            {
                name: 'AnimationPage',
                path: '/animation',
                meta: {
                    title: '动画',
                },
                component: () => import('../pages/AnimationPage.vue'),
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
