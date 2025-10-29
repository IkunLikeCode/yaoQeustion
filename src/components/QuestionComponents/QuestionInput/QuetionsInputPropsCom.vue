<script setup lang="ts">
import type { QuestionInputProps } from "./interface";
import { QuestionInputDefaultProps } from "./interface";
import { ElForm, ElFormItem, ElInput, type FormInstance } from "element-plus";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ref } from "vue";
import randomId from "@/utils/radomId";

const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionInputProps>(), {
  title: QuestionInputDefaultProps.title,
  placeholder: QuestionInputDefaultProps.placeholder,
  titleMaxLength: QuestionInputDefaultProps.titleMaxLength,
  descriptionMaxLength: QuestionInputDefaultProps.descriptionMaxLength,
  isDisabled: QuestionInputDefaultProps.isDisabled
});

// 为每个组件实例创建唯一的表单引用
const formRef = ref<FormInstance | null>(null);
const formId = `input-form-${randomId()}`;

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionInputPropsCom">
    <el-form :id="formId" ref="formRef" :model="formData" label-position="top" :disabled="props.isDisabled">
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
