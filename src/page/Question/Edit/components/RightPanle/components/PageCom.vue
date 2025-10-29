<script setup lang="ts">
import { useQuestionStore } from "@/store/module/question";
import { ElInput, ElForm, ElFormItem, ElColorPicker } from "element-plus";
import { storeToRefs } from "pinia";
import useChangeVarColor from "@/hooks/useChangeVarColor";
const questionStore = useQuestionStore();
const { questionInfo } = storeToRefs(questionStore);
</script>

<template>
  <div class="PageCom">
    <el-form :model="{ questionInfo }" label-position="top">
      <el-form-item label="问卷标题" :rules="[{ required: true, message: '请输入页面标题', trigger: 'blur' }]">
        <el-input v-model="questionInfo.questionTitle" :maxlength="30" placeholder="请输入页面标题" show-word-limit />
      </el-form-item>
      <el-form-item label="问卷描述" :rules="[{ required: true, message: '请输入页面描述', trigger: 'blur' }]">
        <el-input
          v-model="questionInfo.questionDesc"
          type="textarea"
          :maxlength="100"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入页面描述"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="questionInfo.backgroundColor"
          @change="(val: string | null) => val && useChangeVarColor('--center-panel-bg-color', val)"
        />
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker
          v-model="questionInfo.fontColor"
          @change="(val: string | null) => val && useChangeVarColor('--main-text-color', val)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
