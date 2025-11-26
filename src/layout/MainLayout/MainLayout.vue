<script setup lang="ts">
import LogCom from "../../components/log/logCom.vue";
import OptionsCom from "../../components/options/optionsCom.vue";
</script>

<template>
  <div class="app">
    <div class="header">
      <LogCom />
      <OptionsCom />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  padding: 20px;
  height: 60px;
  background-color: #001529;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
