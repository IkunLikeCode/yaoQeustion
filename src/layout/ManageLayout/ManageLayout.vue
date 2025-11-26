<script setup lang="ts">
import MenuList from "./components/MenuList.vue";
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
  margin: 0 auto;
  display: flex;
  height: calc(100vh - 60px);
  .content {
    flex: 1;
    padding: 12px 20px 12px 50px;
    box-sizing: border-box;
    overflow-y: auto;
    height: calc(100vh - 60px);
    @import "@/style/scrollbar.less";
    .custom-scrollbar();
  }
}
</style>
