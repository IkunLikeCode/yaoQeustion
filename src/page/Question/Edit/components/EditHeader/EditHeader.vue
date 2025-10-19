<script setup lang="ts">
import TitleEdit from "./components/TitleEdit.vue";
</script>

<template>
  <div class="EditHeader">
    <div class="left">
      <router-link to="/manage" class="goBack">返回</router-link>
      <TitleEdit />
    </div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<style lang="less" scoped>
.EditHeader {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .goBack {
      color: var(--main-color);
      font-size: 16px;
      text-decoration: none;
    }
  }
}
</style>
