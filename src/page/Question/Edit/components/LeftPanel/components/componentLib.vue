<!-- 组件库组件 -->
<script setup lang="ts">
import { componentGroup, type ComponentConfType } from "@/components/QuestionComponents";
import { useQuestionStore } from "@/store/module/question";
import randomId from "@/utils/radomId";

/**
 * 添加组件
 * @param component 组件配置
 */
function addComponent(component: ComponentConfType) {
  useQuestionStore().addComponent({
    fe_id: randomId(),
    title: component.title || "",
    type: component.type || "",
    isHide: false,
    isLock: false,
    props: component.defaultProps || {}
  });
}
</script>

<template>
  <div class="componentLib">
    <div v-for="componentItem in componentGroup" :key="componentItem.groupKey" class="componentItem">
      <div class="groupTitle">{{ componentItem.title }}</div>
      <div class="componentList">
        <div
          v-for="component in componentItem.componentList"
          :key="component.type"
          class="component"
          @click="addComponent(component)"
        >
          <component :is="component.Component" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.componentLib {
  height: 100%;
  box-sizing: border-box;
  .componentItem {
    margin-bottom: 10px;
    .groupTitle {
      font-size: 16px;
      font-weight: bold;
    }
    .componentList {
      margin-top: 10px;
      padding: 0 2px;
      .component {
        width: 100%;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        user-select: none;
        cursor: pointer;
        background-color: #ececec;
        &:hover {
          outline: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
