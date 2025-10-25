<script setup lang="ts">
import type { QuestionTextareaProps } from "./interface";
import { QuestionTextareaDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
const props = withDefaults(defineProps<QuestionTextareaProps>(), QuestionTextareaDefaultProps);
const emit = defineEmits(["change"]);
// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionTextareaPropsCom">
    <el-form :model="formData" label-position="top">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: ['blur'] }]">
        <el-input v-model="formData.title" :maxlength="props.titleMaxLength" show-word-limit />
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          autosize
          :maxlength="props.contentMaxLength"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
