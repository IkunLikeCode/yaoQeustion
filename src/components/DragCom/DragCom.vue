<!-- 拖住排序组件 -->
<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from "vue";

const dragComRef = useTemplateRef<HTMLDivElement>("dragComRef");
watch(
  dragComRef,
  newVal => {
    if (newVal) {
      newVal.children[0]?.addEventListener("dragstart", e => {
        console.log(e);
      });
      console.log(newVal);
    }
  },
  {
    deep: true
  }
);
</script>

<template>
  <div ref="dragComRef" class="dragComRef">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped></style>
