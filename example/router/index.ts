import { createRouter, createWebHistory } from 'vue-router'
const modules = import.meta.glob('../pages/**.vue')
export const routes: any = [
    {
        name: 'NavPage',
        path: '/',
        meta: {
            title: '登陆',
        },
        component: () => import('../NavPage.vue'),
        children: [
            
        ]
    }
];


const formatRoutes = () => {
    for (let path in modules) {
        const p = path.split('/');
        const c = p[p.length - 1];
        const t = c.replace('Page.vue', '').toLowerCase();
        routes[0].children.push({
            name: c.replace('.vue', ''),
            path: t==='input'? '/':'/'+t,
            meta: {
                title: c.replace('Page.vue', ''),
            },
            component: modules[path],

        })
    }
    
    return routes;
}

const router = createRouter({
    history: createWebHistory(),
    routes: formatRoutes()
})

router.beforeEach((to: any) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
})
export default router
