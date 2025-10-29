<script setup lang="ts">
import type { QuestionTextareaProps } from "./interface";
import { QuestionTextareaDefaultProps } from "./interface";
const props = withDefaults(defineProps<QuestionTextareaProps>(), QuestionTextareaDefaultProps);
</script>

<template>
  <div class="QuestionTextarea">
    <div class="title">{{ props.title }}</div>
    <div class="content">
      {{ props.content }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.QuestionTextarea {
  color: var(--main-text-color);
  pointer-events: none;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content {
    pointer-events: none;
    border: 1px solid #c0c4cc;
    border-radius: 5px;
    padding: 10px;
    color: #b8b8b8;
    box-sizing: border-box;
    // 自动换行
    word-wrap: break-word;
    background-color: #ffffff;
  }
}
</style>
