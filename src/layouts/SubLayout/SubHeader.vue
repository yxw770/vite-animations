<template>
  <header class="sub-header">
    <div class="back" @click="goBack">Back</div>
    <div class="title">Title</div>
    <div class="user-info">
      <span class="money">Money: 100</span>
      <img class="avatar" src="../../assets/avatar.jpeg" alt="User Avatar" />
    </div>
  </header>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  name:  'SubHeader',
  components: {

  },
});
</script>

<script setup>

import {useRouter} from "vue-router";

/*****************  外部變量集  start   *****************/
const router = useRouter()
/*****************  外部變量集   end    *****************/

/*****************  動態變量集  start   *****************/

/*****************  動態變量集   end    *****************/

/*****************   生命週期   start   *****************/

/*****************   生命週期    end    *****************/

/*****************     程式     start   *****************/
const goBack = () => {
  router.go(-1)
}
/*****************     程式      end    *****************/

/*****************     監聽     start   *****************/

/*****************     監聽      end    *****************/
</script>

<style lang="scss" scoped>
.sub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.back {
  position: relative;
  padding-left: 20px; /* 留出空间放置图标 */
}

.back::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: translate(-50%, -50%) rotate(-45deg);
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