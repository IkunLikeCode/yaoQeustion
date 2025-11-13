<script setup lang="ts">
import LeftPanel from "./components/LeftPanel/LeftPanel.vue";
import RightPanle from "./components/RightPanle/RightPanle.vue";
import EditHeader from "./components/EditHeader/EditHeader.vue";
import EditCanvas from "./components/EditCanvas/EditCanvas.vue";
import useGetQuestionDetail from "@/hooks/useGetQuestionDetail";

useGetQuestionDetail();
</script>

<template>
  <div class="EditQuestion">
    <div class="EditHeader">
      <EditHeader></EditHeader>
    </div>
    <div class="EditContent">
      <LeftPanel></LeftPanel>
      <EditCanvas></EditCanvas>
      <RightPanle></RightPanle>
    </div>
  </div>
</template>

<style lang="less" scoped>
.EditContent {
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;

  .center {
    width: 50%;
    height: 100%;
    background-color: #f5f5f5;
  }
  .right {
    width: 20%;
    height: 100%;
    background-color: #f5f5f5;
  }
}
</style>
