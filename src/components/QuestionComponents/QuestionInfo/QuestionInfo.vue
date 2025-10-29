<script setup lang="ts">
import { computed } from "vue";
import type { QuestionInfoProps } from "./interface";
import { QuestionInfoDefaultProps } from "./interface";

const props = withDefaults(defineProps<QuestionInfoProps>(), QuestionInfoDefaultProps);
const levelClass = computed(() => {
  return {
    "level-1": props.level === 1,
    "level-2": props.level === 2,
    "level-3": props.level === 3
  };
});
</script>

<template>
  <div class="QuestionInfo">
    <div class="title" :class="levelClass">{{ props.title }}</div>
    <div class="description">{{ props.description }}</div>
  </div>
</template>

<style lang="less" scoped>
.QuestionInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  height: auto;
  color: var(--main-text-color);
  .title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
  .description {
    font-size: 18px;
    text-align: center;
    // 自动换行
    word-break: break-word;
  }
}
.level-1 {
  font-size: 40px !important;
}
.level-2 {
  font-size: 30px !important;
}
.level-3 {
  font-size: 20px !important;
}
</style>
