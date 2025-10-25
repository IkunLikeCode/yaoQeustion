<script setup lang="ts">
import { computed } from "vue";
import { QuestionRadioDefaultProps } from "./interface";
import type { QuestionRadioProps } from "./interface";
import { ElRadioGroup, ElRadio } from "element-plus";

const props = withDefaults(defineProps<QuestionRadioProps>(), {
  title: QuestionRadioDefaultProps.title,
  options: QuestionRadioDefaultProps.options as any,
  value: QuestionRadioDefaultProps.value,
  isVertical: QuestionRadioDefaultProps.isVertical
});
const selectedValue = computed(() => props.value);
</script>

<template>
  <div class="QuestionRadio">
    <h3 v-if="props.title" class="title">{{ props.title }}</h3>
    <el-radio-group
      v-model="selectedValue"
      :class="{ 'radio-group-column': props.isVertical, 'radio-group-row': !props.isVertical }"
    >
      <el-radio v-for="item in props.options" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<style lang="less" scoped>
.QuestionRadio {
  pointer-events: none;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: var(--question-title-color);
    margin-bottom: 12px;
  }
  .radio-group-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
  .radio-group-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
  }
}
</style>
