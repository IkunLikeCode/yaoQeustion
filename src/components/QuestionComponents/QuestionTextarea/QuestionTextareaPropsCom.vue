<script setup lang="ts">
import type { QuestionTextareaProps } from "./interface";
import { QuestionTextareaDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ref } from "vue";
import randomId from "@/utils/radomId";
import type { FormInstance } from "element-plus";

const props = withDefaults(defineProps<QuestionTextareaProps>(), {
  title: QuestionTextareaDefaultProps.title,
  content: QuestionTextareaDefaultProps.content,
  titleMaxLength: QuestionTextareaDefaultProps.titleMaxLength,
  contentMaxLength: QuestionTextareaDefaultProps.contentMaxLength,
  isDisabled: QuestionTextareaDefaultProps.isDisabled
});
const emit = defineEmits(["change"]);

// 为每个组件实例创建唯一的表单引用
const formRef = ref<FormInstance | null>(null);
const formId = `textarea-form-${randomId()}`;

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionTextareaPropsCom">
    <el-form :id="formId" ref="formRef" :model="formData" label-position="top" :disabled="props.isDisabled">
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
