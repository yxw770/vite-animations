<template>

  <div class="sub-layout" :style="style">
    <Header></Header>
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import {Header, style} from "@/layouts/SubLayout";

</script>

<style scoped>

.sub-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

</style>
