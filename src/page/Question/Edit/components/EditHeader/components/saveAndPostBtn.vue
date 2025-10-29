<!-- 保存和发布按钮 -->
<script setup lang="ts">
import { ElButton } from "element-plus";

function saveQuestion() {}
function publishQuestion() {}
</script>

<template>
  <div class="saveAndPostBtn">
    <ElButton type="default" @click="saveQuestion">保存</ElButton>
    <ElButton type="primary" @click="publishQuestion">发布</ElButton>
  </div>
</template>

<style lang="less" scoped></style>
