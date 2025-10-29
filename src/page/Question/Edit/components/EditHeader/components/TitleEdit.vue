<script setup lang="ts">
import { ElInput, ElButton } from "element-plus";
import { shallowRef } from "vue";
import { useQuestionStore } from "@/store/module/question";
const questionStore = useQuestionStore();
const isEdit = shallowRef(true);
</script>

<template>
  <div class="TitleEdit">
    <div v-if="isEdit" class="title">{{ questionStore.questionInfo.questionTitle }}</div>
    <el-input v-else v-model="questionStore.questionInfo.questionTitle" placeholder="请输入标题" />
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
