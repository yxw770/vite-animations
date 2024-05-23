import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import SubLayout from '@/layouts/SubLayout/SubLayout.vue'
import Home from '@/views/Home.vue'
import Battle from '@/views/Battle.vue'
import Backpack from '@/views/Backpack.vue'
import Payment from '@/views/Payment.vue'
import Profile from '@/views/Profile.vue'
import OtherPage from '@/views/OtherPage.vue'
import OtherPage1 from '@/views/OtherPage1.vue'
import {reactive, ref} from "vue";

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {path: '', component: Home, name: 'Home', meta: {index: 0}},
            {path: 'battle', component: Battle, name: 'Battle', meta: {index: 1}},
            {path: 'backpack', component: Backpack, name: 'Backpack', meta: {index: 2}},
            {path: 'payment', component: Payment, name: 'Payment', meta: {index: 3}},
            {path: 'profile', component: Profile, name: 'Profile', meta: {index: 4}},
        ],
    },
    {
        path: '/sub',
        component: SubLayout,
        children: [
            {path: '', component: OtherPage, meta: {index: 0}},
        ],
    },
    {
        path: '/sub/1',
        component: SubLayout,
        children: [
            {path: '', component: OtherPage1, meta: {index: 0}},
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
// 路由缓存
const historyStack = ref([])
// 路由动画缓存
const routerAnimation = reactive({
    // App大层是否需要动画
    needAnimation: true,
    // 主页面动画
    main: {
        back: false,
        needAnimation: false,
    },
    // 子页面动画
    sub: {
        // 是否是返回
        back: false,
    }
})
// 主要路由
const mainRoutes = ['Home', 'Battle', 'Backpack', 'Payment', 'Profile'];

router.beforeEach((to, from, next) => {
    if (from.matched.length === 0) {
        historyStack.value = [to.fullPath]
        routerAnimation.main.needAnimation = false
        routerAnimation.needAnimation = false
    } else {
        historyStack.value.push(to.fullPath)
        console.log(2, historyStack.value)
        // console.log(routerAnimation, to.name, from.name)
        // 子页面动画 去的界面不是主页面 或者 不是从主页面离开
        if (!mainRoutes.includes(to.name) || (!mainRoutes.includes(from.name) || !from.name)) {
            routerAnimation.needAnimation = true
            if (mainRoutes.includes(to.name) || mainRoutes.includes(from.name)) {
                // 去主页面或者从主页面离开 都要禁止主页面的动画
                routerAnimation.main.needAnimation = false
                routerAnimation.sub.back = false
                // 返回主页面清空历史记录
                if (mainRoutes.includes(to.name)) historyStack.value.length = 0;
            } else {
                const fromIndex = historyStack.value.indexOf(from.fullPath)
                const toIndex = historyStack.value.indexOf(to.fullPath)
                console.log(historyStack.value, from.fullPath, to.fullPath, fromIndex, toIndex)
                if (toIndex !== -1 && fromIndex !== -1) {
                    routerAnimation.sub.back = toIndex < fromIndex
                    if (routerAnimation.sub.back) {
                        historyStack.value.splice(fromIndex, toIndex < fromIndex ? 1 : 0);
                    }
                } else {
                    routerAnimation.sub.back = false
                }
            }
        } else {
            // 主页面动画
            routerAnimation.needAnimation = false
            routerAnimation.main.needAnimation = true
            routerAnimation.main.back = to.meta.index < from.meta.index

        }

    }


    next()
})

export default router
export {routerAnimation, historyStack}
