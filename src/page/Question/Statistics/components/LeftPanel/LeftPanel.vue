<script setup lang="ts">
import { getComponentByType } from "@/components/QuestionComponents";
import { useQuestionStore } from "@/store/module/question";
import type { ComponentInfoType } from "@/store/module/question/index";
const questionStore = useQuestionStore();
const emit = defineEmits(["clickHandle"]);
const clickHandle = (componentInfo: ComponentInfoType) => {
  emit("clickHandle", componentInfo);
};
</script>

<template>
  <div class="LeftPanel">
    <template v-for="componentItem in questionStore.componentsList" :key="componentItem.id">
      <div class="qustionStyle" @click="clickHandle(componentItem)">
        <component :is="getComponentByType(componentItem.type)?.Component" v-bind="componentItem.props" />
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.LeftPanel {
  padding: 10px;
  box-sizing: border-box;
  height: 100vh;

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
