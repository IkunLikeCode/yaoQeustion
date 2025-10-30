<script setup lang="ts">
import { ElHeader } from "element-plus";
import LogCom from "../../components/log/logCom.vue";
import OptionsCom from "../../components/options/optionsCom.vue";
</script>

<template>
  <div class="app">
    <el-header class="header">
      <LogCom />
      <OptionsCom />
    </el-header>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  height: 60px;
  background-color: #001529;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
