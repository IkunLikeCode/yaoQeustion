<script setup lang="ts">
import { ElButton } from "element-plus";
import { useUserStore } from "@/store/module/user/userStore";
import { computed } from "vue";

const userStore = useUserStore();

const isLogin = computed(() => userStore.isLogin);
</script>

<template>
  <div class="HomePage">
    <div class="title">逍遥问卷</div>
    <router-link :to="isLogin ? '/manage' : '/login'">
      <el-button class="start-btn">开始使用</el-button>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.HomePage {
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #30cfd0, #9a7dbe);
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 50px;
    color: #fff;
    user-select: none;
    font-weight: 600;
  }
  .start-btn {
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #fff;
    color: #30cfd0;
  }
}
</style>
