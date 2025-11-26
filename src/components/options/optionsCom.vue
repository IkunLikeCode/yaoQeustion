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
  userStore.userInfo = {
    username: "",
    avatar: "",
    nickname: "",
    id: ""
  };
  router.push("/login");
}
</script>

<!-- 该组件是显示用户选项的组件 -->
<template>
  <div class="optionsCom">
    <el-dropdown v-if="userStore.isLogin">
      <div class="avatar">
        <el-avatar :size="50" :src="userStore.userInfo?.avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.optionsCom {
  padding: 0 20px 0 0;
  .avatar {
    display: flex;
    align-items: center;
  }
}
</style>
