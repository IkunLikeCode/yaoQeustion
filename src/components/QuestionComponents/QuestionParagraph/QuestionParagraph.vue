<script setup lang="ts">
import type { QuestionParagraphProps } from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";

const props = withDefaults(defineProps<QuestionParagraphProps>(), QuestionParagraphDefaultProps);
</script>

<template>
  <div class="QuestionParagraph">
    <div class="title" :style="{ textAlign: props.isCenter ? 'center' : 'left' }">{{ props.title }}</div>
  </div>
</template>

<style lang="less" scoped></style>
