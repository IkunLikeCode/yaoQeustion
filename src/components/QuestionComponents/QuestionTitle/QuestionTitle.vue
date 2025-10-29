<script setup lang="ts">
import { computed } from "vue";
import { QuestionTitleDefaultProps, type QuestionTitleProps } from "./interface";

const props = withDefaults(defineProps<QuestionTitleProps>(), {
  isCenter: QuestionTitleDefaultProps.isCenter,
  title: QuestionTitleDefaultProps.title,
  level: QuestionTitleDefaultProps.level as QuestionTitleProps["level"]
});
const levelClass = computed(() => {
  return {
    "level-1": props.level === 1,
    "level-2": props.level === 2,
    "level-3": props.level === 3
  };
});
</script>

<template>
  <div class="questionTitle">
    <div class="title" :class="levelClass" :style="{ textAlign: props.isCenter ? 'center' : 'left' }">
      {{ props.title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.questionTitle {
  color: var(--main-text-color);
  .title {
    font-size: 16px;
    font-weight: bold;
    // 换行
    word-break: break-word;
  }
  .level-1 {
    font-size: 24px;
  }
  .level-2 {
    font-size: 20px;
  }
  .level-3 {
    font-size: 16px;
  }
}
</style>
