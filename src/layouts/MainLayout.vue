<template>
  <div class="main-layout">
    <header class="header">
      <div class="logo"><img src="https://via.placeholder.com/120x40" alt=""></div>
      <div class="user-info">
        <span class="money">Money: 100</span>
        <img class="avatar" src="@/assets/avatar.jpeg" alt="User Avatar"/>
      </div>
    </header>
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </main>
    <nav class="footer-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/battle">Battle</router-link>
      <router-link to="/backpack">Backpack</router-link>
      <router-link to="/payment">Payment</router-link>
      <router-link to="/profile">Profile</router-link>
    </nav>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {routerAnimation} from '@/router'

const route = useRoute()

const transitionName = computed(() => {
  if (!routerAnimation.main.needAnimation) return ''
  return routerAnimation.main.back ? 'slide-left' : 'slide-right'
})
</script>


<style scoped>

.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;

}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.user-info {
  max-width: 100%; /* 限制宽度为容器的100% */
  max-height: 100%; /* 限制高度为容器的100% */
  object-fit: cover; /* 保持图片的纵横比 */
  overflow: hidden; /* 防止图片超出容器 */
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
