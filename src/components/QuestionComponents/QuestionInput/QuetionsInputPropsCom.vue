<script setup lang="ts">
import type { QuestionInputProps } from "./interface";
import { QuestionInputDefaultProps } from "./interface";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionInputProps>(), QuestionInputDefaultProps);

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionInputPropsCom">
    <el-form :model="formData" label-position="top">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input
          v-model="formData.title"
          placeholder="请输入标题"
          :maxlength="formData.titleMaxLength"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="placeholder">
        <el-input
          v-model="formData.placeholder"
          placeholder="请输入描述"
          show-word-limit
          :maxlength="formData.descriptionMaxLength"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
