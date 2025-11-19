<script setup lang="ts">
defineProps<{
  count?: number;
}>();
</script>

<template>
  <div class="TablePanel">
    {{ count || 0 }}
  </div>
</template>

<style lang="less" scoped></style>
