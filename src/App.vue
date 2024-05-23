<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <KeepAlive include="MainLayout">
        <transition :name="getTransitionName(route)">
          <component :is="Component" :key="routeKey"/>
        </transition>
      </KeepAlive>
    </router-view>
  </div>
</template>

<script setup>
import {  ref} from "vue";
import {routerAnimation, historyStack} from "@/router/index.js";

const routeKey = ref("MainLayout");
const getTransitionName = (route) => {
  const mainRoutes = ['Home', 'Battle', 'Backpack', 'Payment', 'Profile'];
  if (mainRoutes.includes(route.name)) {
    // 主页面
    routeKey.value = 'MainLayout';
    return routerAnimation.needAnimation ? 'router-slide-left' : ''; // 首次进入不需要过渡动画
  } else {
    // 子页面
    routeKey.value = route.path;
    if (!routerAnimation.needAnimation) return '';
    //router-slide-left 从右边进入
    //router-slide-right 从左边进入
    return routerAnimation.sub.back ? 'router-slide-left' : 'router-slide-right';
  }
};
</script>

<style>
/* 全局样式可以在这里定义 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f2f5;
}

#app {
  height: 100vh;
}

</style>
