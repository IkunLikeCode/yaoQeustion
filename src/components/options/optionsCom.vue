<script setup lang="ts">
import { ElDropdown, ElAvatar, ElDropdownMenu, ElDropdownItem } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user/userStore";
import { removeLocalStorage } from "@/utils/localStoreage";
const router = useRouter();
const userStore = useUserStore();
function logout() {
  removeLocalStorage("questionToken");
  userStore.isLogin = false;
  router.push("/login");
}
</script>

<!-- 该组件是显示用户选项的组件 -->
<template>
  <div class="optionsCom">
    <el-dropdown>
      <el-avatar :size="50" src="../../../public/log.png" />
      <!-- <img :src="userStore.userInfo?.avatar" alt="用户头像" style="width: 50px; height: 50px; border-radius: 50%" /> -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.optionsCom {
  padding: 0 20px 0 0;
}
</style>
