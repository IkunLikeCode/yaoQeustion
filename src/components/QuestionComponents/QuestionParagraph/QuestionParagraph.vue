<script setup lang="ts">
import { computed } from "vue";
import type { QuestionParagraphProps } from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";

const props = withDefaults(defineProps<QuestionParagraphProps>(), {
  title: QuestionParagraphDefaultProps.title,
  isCenter: QuestionParagraphDefaultProps.isCenter
});
const newTitle = computed(() => {
  const newStr = props.title.split("\n");
  // 处理标题中的空格
  const trimmedStr = newStr.map(item => item.trim());
  return trimmedStr;
});
</script>

<template>
  <div class="QuestionParagraph">
    <div v-for="item in newTitle" :key="item" class="title" :style="{ textAlign: props.isCenter ? 'center' : 'left' }">
      {{ item }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.QuestionParagraph {
  pointer-events: none;
  color: var(--main-text-color);
  .title {
    font-size: 16px;
    font-weight: bold;
    // 换行
    word-break: break-word;
  }
}
</style>
