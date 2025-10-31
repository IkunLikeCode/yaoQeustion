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
  @import "@/style/scrollbar.less";
  .custom-scrollbar();
}
</style>
