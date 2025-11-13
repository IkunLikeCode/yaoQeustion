<script setup lang="ts">
import { getComponentByType } from "@/components/QuestionComponents";
import { useQuestionStore } from "@/store/module/question";
const questionStore = useQuestionStore();
</script>

<template>
  <div class="LeftPanel">
    <template v-for="componentItem in questionStore.componentsList" :key="componentItem.id">
      <div class="qustionStyle">
        <component :is="getComponentByType(componentItem.type)?.Component" v-bind="componentItem.props" />
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.LeftPanel {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .qustionStyle {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    margin: 5px 0;
    &:hover {
      outline: 1px solid var(--question-hover-border-color);
    }
  }
}
</style>
