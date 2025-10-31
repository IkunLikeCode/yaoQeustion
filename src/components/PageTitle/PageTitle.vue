<script setup lang="ts">
defineProps<{
  title: string;
  fontSize?: string;
}>();
</script>

<template>
  <div class="PageTitle">
    <div class="title" :style="{ fontSize: fontSize || '16px' }">{{ title }}</div>
    <div class="other">
      <slot> </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.PageTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
