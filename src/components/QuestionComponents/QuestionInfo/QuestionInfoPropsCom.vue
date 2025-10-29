<script setup lang="ts">
import type { QuestionInfoProps } from "./interface";
import { QuestionInfoDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ElForm, ElFormItem, ElSelect, ElInput, ElOption, type FormInstance } from "element-plus";
import { ref } from "vue";
import randomId from "@/utils/radomId";

const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionInfoProps>(), {
  title: QuestionInfoDefaultProps.title,
  description: QuestionInfoDefaultProps.description,
  level: QuestionInfoDefaultProps.level,
  titleMaxLength: QuestionInfoDefaultProps.titleMaxLength,
  descriptionMaxLength: QuestionInfoDefaultProps.descriptionMaxLength,
  isDisabled: QuestionInfoDefaultProps.isDisabled
});

// 为每个组件实例创建唯一的表单引用
const formRef = ref<FormInstance | null>(null);
const formId = `info-form-${randomId()}`;

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionInfoPropsCom">
    <el-form :id="formId" ref="formRef" :model="formData" label-position="top" :disabled="props.isDisabled">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: ['blur'] }]">
        <el-input v-model="formData.title" :maxlength="props.titleMaxLength" placeholder="请输入标题" show-word-limit />
      </el-form-item>
      <el-form-item label="标题" prop="level">
        <el-select v-model="formData.level" placeholder="请选择类型">
          <el-option label="一级标题" :value="1" />
          <el-option label="二级标题" :value="2" />
          <el-option label="三级标题" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          autosize
          :maxlength="props.descriptionMaxLength"
          placeholder="请输入描述"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
