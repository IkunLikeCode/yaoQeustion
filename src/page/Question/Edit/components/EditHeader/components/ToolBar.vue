<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { useQuestionStore } from "@/store/module/question";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import MyUndoRedo from "@/utils/myUndoRedo";
const questionStore = useQuestionStore();
const { selectedId } = storeToRefs(questionStore);

const forbidden = computed(() => {
  return !questionStore.copyComponent;
});
const isSelect = computed(() => {
  return !questionStore.componentsList.length;
});
</script>

<template>
  <div class="toolBar">
    <ElTooltip class="delete" content="删除">
      <el-button :disabled="isSelect" circle @click="questionStore.deleteComponent(selectedId)">
        <i class="iconfont icon-top"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="hide" content="隐藏">
      <el-button circle :disabled="isSelect" @click="questionStore.hideComponent(selectedId)">
        <i class="iconfont icon-a-Notvisible"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="lock" content="锁定">
      <el-button
        :type="questionStore.getSelectComponent()?.isLock ? 'primary' : ''"
        circle
        :disabled="isSelect"
        @click="questionStore.lockComponent(selectedId)"
      >
        <i class="iconfont icon-suo"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="copy" content="复制">
      <el-button :disabled="isSelect" circle @click="questionStore.copyComponentHandle()">
        <i class="iconfont icon-fuzhi"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="niantie" content="粘贴">
      <el-button circle :disabled="forbidden" @click="questionStore.niantieComponent()">
        <i class="iconfont icon-niantie"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="up" content="上移">
      <el-button circle :disabled="isSelect" @click="questionStore.upComponent()">
        <i class="iconfont icon-xiangshangjiantou"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="down" content="下移">
      <el-button circle :disabled="isSelect" @click="questionStore.downComponent()">
        <i class="iconfont icon-xiangxiajiantou"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="undo" content="撤销">
      <el-button circle :disabled="isSelect" @click="MyUndoRedo.undo()">
        <i class="iconfont icon-24gl-redo3"></i>
      </el-button>
    </ElTooltip>
    <ElTooltip class="redo" content="重做">
      <el-button circle :disabled="isSelect" @click="MyUndoRedo.redo()">
        <i class="iconfont icon-24gl-undo3"></i>
      </el-button>
    </ElTooltip>
  </div>
</template>

<style lang="less" scoped>
.toolBar {
  display: flex;
  gap: 10px;
}
</style>
