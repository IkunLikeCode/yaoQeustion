<script setup lang="ts">
import { ElInput } from "element-plus";
import { QuestionInputDefaultProps, type QuestionInputProps } from "./interface";
const props = withDefaults(defineProps<QuestionInputProps>(), {
  title: QuestionInputDefaultProps.title,
  placeholder: QuestionInputDefaultProps.placeholder
});
</script>

<template>
  <div class="QustionInput">
    <div class="title">{{ props.title }}</div>
    <ElInput class="elinput" :placeholder="props.placeholder" />
  </div>
</template>

<style lang="less" scoped>
.QustionInput {
  .elinput {
    pointer-events: none;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: var(--question-title-color);
    margin-bottom: 10px;
  }
}
</style>
