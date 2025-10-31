<script setup lang="ts">
import { ElResult } from "element-plus";
</script>

<template>
  <div class="NotFound">
    <el-result title="404" sub-title="找不到该页面">
      <template #extra>
        <el-button type="primary">
          <router-link to="/" class="goHome">首页</router-link>
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="less" scoped>
.goHome {
  display: inline-block;
  text-decoration: none;
  background-color: #409eff;
  color: #fff;
}
</style>
