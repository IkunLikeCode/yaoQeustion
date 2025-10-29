<script setup lang="ts">
import { computed } from "vue";
import type { QuestionCheckboxProps } from "./interface";
import { QuestionCheckboxDefaultProps } from "./interface";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
const props = withDefaults(defineProps<QuestionCheckboxProps>(), {
  title: QuestionCheckboxDefaultProps.title,
  options: QuestionCheckboxDefaultProps.options as any,
  isVertical: QuestionCheckboxDefaultProps.isVertical,
  value: QuestionCheckboxDefaultProps.value as any
});
const selectedOptions = computed(() => {
  return props.value || [];
});
</script>

<template>
  <div class="QuestionCheckbox">
    <h3 v-if="props.title" class="title">{{ props.title }}</h3>
    <el-checkbox-group
      v-model="selectedOptions as any"
      :class="{ 'checkbox-group-column': props.isVertical, 'checkbox-group-row': !props.isVertical }"
    >
      <el-checkbox v-for="item in props.options" :key="item.value" :label="item.value">
        <div class="checkbox-item-content">
          {{ item.label }}
        </div>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style lang="less" scoped>
.QuestionCheckbox {
  pointer-events: none;
  color: var(--main-text-color);
  .displayCommon() {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .checkbox-group-column {
    .displayCommon();
    flex-direction: column;
  }
  .checkbox-group-row {
    .displayCommon();
    flex-direction: row;
  }
  .checkbox-item-content {
    // 换行
    word-break: break-word;
  }
}
</style>
