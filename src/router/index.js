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
    needAnimation: true, // App大层是否需要动画
    main: {
        back: false,
        needAnimation: false,
    },
    sub: {
        back: false, // 子页面动画是否是返回
    }
})
const mainRoutes = ['Home', 'Battle', 'Backpack', 'Payment', 'Profile']

router.beforeEach((to, from, next) => {
    const isInitialRoute = from.matched.length === 0
    // 是否去主页面
    const isToMainRoute = mainRoutes.includes(to.name)
    // 是否来自主页面来
    const isFromMainRoute = mainRoutes.includes(from.name)

    if (isInitialRoute) {
        historyStack.value = [to.fullPath]
        routerAnimation.main.needAnimation = false
        routerAnimation.needAnimation = false
    } else {
        historyStack.value.push(to.fullPath)

        if (!isToMainRoute || !isFromMainRoute) {
            routerAnimation.needAnimation = true

            if (isToMainRoute || isFromMainRoute) {
                routerAnimation.main.needAnimation = false
                routerAnimation.sub.back = false

                if (isToMainRoute) {
                    historyStack.value.length = 0
                }
            } else {
                const fromIndex = historyStack.value.indexOf(from.fullPath)
                const toIndex = historyStack.value.indexOf(to.fullPath)

                if (toIndex !== -1 && fromIndex !== -1) {
                    routerAnimation.sub.back = toIndex < fromIndex
                    if (routerAnimation.sub.back) {
                        historyStack.value.splice(fromIndex, 1)
                    }
                } else {
                    routerAnimation.sub.back = false
                }
            }
        } else {
            routerAnimation.needAnimation = false
            routerAnimation.main.needAnimation = true
            routerAnimation.main.back = to.meta.index < from.meta.index
        }
    }

    next()
})


export default router
export {routerAnimation, historyStack}
