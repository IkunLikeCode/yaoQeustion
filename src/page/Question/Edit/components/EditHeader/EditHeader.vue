<script setup lang="ts">
import TitleEdit from "./components/TitleEdit.vue";
import ToolBar from "./components/ToolBar.vue";
import SaveAndPostBtn from "./components/saveAndPostBtn.vue";
</script>

<template>
  <div class="EditHeader">
    <div class="left">
      <router-link to="/manage" class="goBack">返回</router-link>
      <TitleEdit />
    </div>
    <div class="center">
      <ToolBar />
    </div>
    <div class="right">
      <SaveAndPostBtn />
    </div>
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
  justify-content: space-between;
  width: 100%;
  .center {
    width: 40%;
    display: flex;
    justify-content: center;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 25%;
    .goBack {
      color: var(--main-color);
      font-size: 16px;
      text-decoration: none;
    }
  }
  .right {
    width: 25%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
