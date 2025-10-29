<script setup lang="ts">
import { ElTabs, ElTabPane } from "element-plus";
import { computed } from "vue";
import PropsCom from "./components/PropsCom.vue";
import PageCom from "./components/PageCom.vue";
import { useQuestionStore } from "@/store/module/question";
const questionStore = useQuestionStore();
const activeTab = computed(() => {
  return questionStore.selectedId ? "props" : "style";
});
</script>

<template>
  <div class="RightPanle">
    <el-tabs :model-value="activeTab">
      <el-tab-pane label="属性" name="props">
        <PropsCom />
      </el-tab-pane>
      <el-tab-pane label="页面设置" name="style">
        <PageCom />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}
.RightPanle {
  width: 20%;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: var(--right-panel-bg-color);
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(54, 54, 54, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(59, 58, 58, 0.3);
    border-radius: 3px;
    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
