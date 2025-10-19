<script setup lang="ts"></script>

<template>
  <router-link class="log" to="/">
    <i class="iconfont icon-bianji"></i>
    <span class="title">逍遥问卷</span>
  </router-link>
</template>

<style lang="less" scoped>
.log {
  height: 40px;
  border-radius: 5px;
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  text-decoration: none;
  i {
    font-size: 40px;
  }
  .title {
    font-size: 20px;
    user-select: none;
  }
}
</style>
