<!-- 段落组件属性组件 -->
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElCheckbox } from "element-plus";
import type { QuestionParagraphProps } from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";

const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionParagraphProps>(), {
  title: QuestionParagraphDefaultProps.title,
  isCenter: QuestionParagraphDefaultProps.isCenter,
  maxLength: QuestionParagraphDefaultProps.maxLength
});

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionParagraphPropsCom">
    <el-form :model="formData" label-position="top">
      <el-form-item prop="title" label="标题" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input v-model="formData.title" :maxlength="props.maxLength" placeholder="请输入标题" show-word-limit />
      </el-form-item>
      <el-form-item label-position="left" prop="isCenter" label="是否居中">
        <el-checkbox v-model="formData.isCenter" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
