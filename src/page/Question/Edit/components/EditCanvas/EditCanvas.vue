<script setup lang="ts">
import { getComponentByType } from "@/components/QuestionComponents";
import { useQuestionStore } from "@/store/module/question";
import type { ComponentInfoType } from "@/store/module/question";

const qeustionStore = useQuestionStore();

// 点击画布中组件
function clickCanvasComponent(componentItem: ComponentInfoType) {
  qeustionStore.selectComponent(componentItem.fe_id);
}
</script>

<template>
  <div class="EditCanvas">
    <div class="canvas">
      <div v-if="qeustionStore.componentsList.length === 0" class="empty-state">暂无组件，请从左侧添加组件</div>
      <template v-for="componentItem in qeustionStore.componentsList" :key="componentItem.fe_id">
        <div
          v-if="!componentItem.isHide"
          class="qustionStyle"
          :class="componentItem.fe_id === qeustionStore.selectedId ? 'active' : ''"
          @click="clickCanvasComponent(componentItem)"
        >
          <component :is="getComponentByType(componentItem.type)?.Component" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
.active {
  outline: 1px solid var(--question-avtive-color) !important;
}
.EditCanvas {
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .canvas {
    width: 50%;
    height: 100%;
    background-color: var(--center-panel-bg-color);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(54, 54, 54, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(59, 58, 58, 0.3);
      border-radius: 3px;
      transition: background 0.2s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
