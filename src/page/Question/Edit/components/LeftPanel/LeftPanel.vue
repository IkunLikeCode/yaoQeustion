<script setup lang="ts">
import PhotoCom from "./components/photoCom.vue";
import ComponentLib from "./components/componentLib.vue";
import { ElTabs, ElTabPane } from "element-plus";
import { ref } from "vue";

const activeTab = ref("componentLib");
</script>

<template>
  <div class="LeftPanel">
    <el-tabs v-model="activeTab" class="left-tabs">
      <el-tab-pane label="组件库" name="componentLib" class="tab-pane">
        <template #label>
          <div class="tab-label">
            <i class="iconfont icon-kucun"></i>
            <span>组件库</span>
          </div>
        </template>
        <ComponentLib />
      </el-tab-pane>
      <el-tab-pane label="图层" name="photoCom" class="tab-pane">
        <template #label>
          <div class="tab-label">
            <i class="iconfont icon-gistuceng"></i>
            <span>图层</span>
          </div>
        </template>
        <PhotoCom />
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
.LeftPanel {
  width: 20%;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: var(--left-panel-bg-color);
  box-sizing: border-box;
  overflow-y: auto;
  .left-tabs {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  @import "@/style/scrollbar.less";
  .custom-scrollbar();
  .tab-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 16px;
  }
}
</style>
