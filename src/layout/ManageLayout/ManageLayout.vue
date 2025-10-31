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
