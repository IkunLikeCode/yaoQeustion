<script setup lang="ts">
import { useQuestionStore } from "@/store/module/question";
import { getComponentByType } from "@/components/QuestionComponents";
import { shallowRef, markRaw } from "vue";

const questionStore = useQuestionStore();

// 当前属性面板组件和需要传入的属性
const propsCom = shallowRef<any>(null);
const propsData = shallowRef<Record<string, any>>({});

questionStore.$subscribe((_mutation, state) => {
  const current = state.componentsList.find(item => item.fe_id === state.selectedId);
  if (!current) {
    propsCom.value = null;
    propsData.value = {};
    return;
  }
  const conf = getComponentByType(current.type);
  // 组件本身确保是非响应式
  propsCom.value = conf?.PropsCom ? markRaw(conf.PropsCom) : null;
  // 传入当前选中组件的 props（不是 defaultProps）
  propsData.value = current.props;
  propsData.value.isDisabled = current.isLock;
});

function onChangeHandle(value: any) {
  // 获取当前选中的组件
  const selectedId = questionStore.selectedId;
  if (!selectedId) return;
  // 更新组件的属性
  questionStore.updateComponentProps(selectedId, value);
}
</script>

<template>
  <div class="PropsCom">
    <component :is="propsCom" v-if="propsCom" v-bind="propsData" @change="onChangeHandle" />
  </div>
</template>

<style lang="less" scoped>
.PropsCom {
  height: 100%;
}
</style>
