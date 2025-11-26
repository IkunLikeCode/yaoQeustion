<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import DataPresentation from "./components/DataPresentation.vue";
import UserInfo from "./components/UserInfo.vue";
</script>

<template>
  <div class="PersonCenter">
    <PageTitle title="个人中心" font-size="30px" />
    <div class="main">
      <DataPresentation />
      <UserInfo />
    </div>
  </div>
</template>

<style lang="less" scoped>
.PersonCenter {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .main {
    display: flex;
    gap: 20px;
  }
}
</style>
