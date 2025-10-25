<script setup lang="ts">
import { ElTabs, ElTabPane } from "element-plus";
import { ref } from "vue";
import PropsCom from "./components/PropsCom.vue";
import PageCom from "./components/PageCom.vue";

const activeTab = ref("props");
</script>

<template>
  <div class="RightPanle">
    <el-tabs v-model="activeTab">
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
.RightPanle {
  width: 20%;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: var(--right-panel-bg-color);
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
