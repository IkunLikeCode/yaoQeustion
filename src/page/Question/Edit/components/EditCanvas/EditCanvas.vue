<script setup lang="ts">
import { getComponentByType } from "@/components/QuestionComponents";
import { useQuestionStore } from "@/store/module/question";
import type { ComponentInfoType } from "@/store/module/question";
import { onUnmounted } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { computed, ref, TransitionGroup } from "vue";
const qeustionStore = useQuestionStore();
const draggingIndex = ref<number>(-1); // 正在拖动的组件索引
const dragOverIndex = ref<number>(-1); // 拖拽经过的组件索引
// 点击画布中组件
function clickCanvasComponent(componentItem: ComponentInfoType) {
  qeustionStore.selectComponent(componentItem.fe_id);
}
// 点击画布空白区域取消选中
function clickCanvasBlank(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    qeustionStore.selectComponent("");
  }
}
const componentList = computed(() => {
  return qeustionStore.componentsList.filter(item => {
    return !item.isHide;
  });
});

// 拖动开始
function handleDragStart(index: number) {
  // 记录当前拖拽的组件索引
  draggingIndex.value = index;
}
// 拖动经过
function handleDragOver(index: number) {
  // 记录当前拖拽经过的组件索引（排除当前拖拽的组件）
  if (index !== draggingIndex.value) {
    dragOverIndex.value = index;
  }
}
// 拖动进入
function handleDragEnter(index: number) {
  if (index !== draggingIndex.value) {
    // 处理拖动进入逻辑（例如：添加一个占位符）
    dragOverIndex.value = index;
  }
}
// 拖动离开
function handleDragLeave(index: number) {
  if (index !== draggingIndex.value) {
    // 处理拖动离开逻辑（例如：移除占位符）
    dragOverIndex.value = -1;
  }
}
// 拖动结束
function handleDragEnd() {
  // 重置拖拽索引
  draggingIndex.value = -1;
  // 重置拖拽经过的组件索引
  dragOverIndex.value = -1;
}
// 拖动放下
function handleDrop(index: number) {
  // 排除当前拖拽的组件
  if (index === draggingIndex.value) return;
  // 处理拖动放下逻辑（例如：插入组件）
  const curComponentList = qeustionStore.componentsList.filter(item => {
    return !item.isHide;
  });
  const temp = curComponentList[draggingIndex.value];
  curComponentList.splice(draggingIndex.value, 1);
  curComponentList.splice(index, 0, temp!);
  // 更新组件列表
  qeustionStore.componentsList = curComponentList;
}

onUnmounted(() => {
  qeustionStore.$patch({
    componentsList: [],
    questionInfo: {
      questionTitle: "",
      questionDesc: "",
      fontColor: "#000000",
      backgroundColor: "#ffffff"
    },
    selectedId: "",
    copyComponent: {}
  });
});
</script>

<template>
  <div class="EditCanvas" @click.capture="clickCanvasBlank">
    <div class="canvas">
      <div v-if="qeustionStore.componentsList.length === 0" class="empty-state">暂无组件，请从左侧添加组件</div>
      <TransitionGroup name="com-transition">
        <template v-for="(componentItem, index) in componentList" :key="componentItem.fe_id">
          <div
            v-if="!componentItem.isHide"
            draggable="true"
            class="qustionStyle"
            :class="{
              active: componentItem.fe_id === qeustionStore.selectedId,
              isLock: componentItem.isLock,
              isEnter: index === dragOverIndex
            }"
            @click="clickCanvasComponent(componentItem)"
            @dragstart="handleDragStart(index)"
            @dragover.prevent="handleDragOver(index)"
            @dragenter.prevent="handleDragEnter(index)"
            @dragleave="handleDragLeave(index)"
            @drop="handleDrop(index)"
            @dragend="handleDragEnd()"
          >
            <component :is="getComponentByType(componentItem.type)?.Component" v-bind="componentItem.props" />
          </div>
        </template>
      </TransitionGroup>
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
.isLock {
  cursor: not-allowed;
  opacity: 0.5;
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
.isEnter {
  outline: 1px solid var(--question-avtive-color) !important;
}
.com-transition-move,
.com-transition-enter-active,
.com-transition-leave-active {
  // 离开动画保持元素位置
  transition: all 0.3s cubic-bezier(0.22, 0, 0.1, 1);
}
.com-transition-enter-from,
.com-transition-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}
</style>
