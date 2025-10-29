<!-- 图层组件 -->
<script setup lang="ts">
import { useQuestionStore } from "@/store/module/question";
const questionStore = useQuestionStore();

// 点击组件列表的组件
function clickHandle(index: number) {
  if (questionStore.componentsList.length > 0) {
    questionStore.selectComponent(questionStore.componentsList[index]!.fe_id);
  }
}
// 事件点击处理
function eveClickHandle(index: number) {
  questionStore.hideComponent(questionStore.componentsList[index]!.fe_id);
}
// 锁定点击处理
function lockClickHandle(index: number) {
  questionStore.lockComponent(questionStore.componentsList[index]!.fe_id);
}
</script>

<template>
  <div class="photoCom">
    <div v-if="questionStore.componentsList.length === 0" class="notComList">暂无组件，请从左侧添加组件</div>
    <div
      v-for="(comItem, index) in questionStore.componentsList"
      :key="comItem.fe_id"
      class="comItem"
      :class="{ comItemActive: comItem.fe_id === questionStore.selectedId }"
      @click="clickHandle(index)"
    >
      <div class="title">{{ comItem?.props.title }}</div>
      <div class="option">
        <div class="eve" :class="{ eveActive: comItem.isHide }" @click.stop="eveClickHandle(index)">
          <i class="iconfont icon-a-Notvisible"></i>
        </div>
        <div class="lock" :class="{ lockActive: comItem.isLock }" @click.stop="lockClickHandle(index)">
          <i class="iconfont icon-suo"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.photoCom {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px;
  box-sizing: border-box;
  .display() {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
  .comItemOption() {
    cursor: pointer;
    border-radius: 50%;
  }
  .comItem {
    padding: 5px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    cursor: pointer;
    user-select: none;
    .display();
  }
  .option {
    .eve {
      padding: 5px;
      color: #000;
      &.eveActive {
        background-color: #4da0ff;
        color: #fff;
      }
      .comItemOption();
    }
    .lock {
      padding: 5px;
      color: #000;
      &.lockActive {
        background-color: #4da0ff;
        color: #fff;
      }
      .comItemOption();
    }

    .display();
  }

  .comItemActive {
    outline: 1px solid #4da0ff;
  }
}
</style>
