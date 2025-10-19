<script setup lang="ts">
import { ElInput, ElButton } from "element-plus";
import { shallowRef } from "vue";
const isEdit = shallowRef(true);
const title = shallowRef("个人信息调查");
</script>

<template>
  <div class="TitleEdit">
    <div v-if="isEdit" class="title">{{ title }}</div>
    <el-input v-else v-model="title" placeholder="请输入标题" />
    <el-button link @click="isEdit = !isEdit">
      <i class="iconfont icon-xiezuo editIcon"></i>
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.TitleEdit {
  display: flex;
  align-items: center;
  gap: 10px;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .editIcon {
    font-size: 16px;
    color: var(--main-color);
  }
}
</style>
