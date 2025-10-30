<script setup lang="ts">
import { onMounted, reactive } from "vue";
import MenuList from "./components/MenuList.vue";
import { useQuestionList } from "@/store/module/questionList";
import { useUserStore } from "@/store/module/user/userStore";
const userStore = useUserStore();
const useQuestionListStore = useQuestionList();
const pageInfo = reactive({
  userId: userStore.userInfo.id,
  page: 1,
  pageSize: 10
});
onMounted(() => {
  useQuestionListStore.getQuestionListByUserIdAction(pageInfo);
});
</script>

<template>
  <div class="ManageLayout">
    <MenuList></MenuList>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ManageLayout {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  .content {
    flex: 1;
    padding: 12px 0 12px 50px;
    box-sizing: border-box;
  }
}
</style>
