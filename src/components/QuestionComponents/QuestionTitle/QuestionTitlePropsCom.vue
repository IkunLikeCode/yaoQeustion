<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElCheckbox, type FormInstance } from "element-plus";
import { QuestionTitleDefaultProps, type QuestionTitleProps } from "./interface";
import { useTemplateRef } from "vue";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";

const emit = defineEmits(["change"]);
const formRef = useTemplateRef<FormInstance>("formRef");
const props = withDefaults(defineProps<QuestionTitleProps>(), {
  isCenter: QuestionTitleDefaultProps.isCenter,
  title: QuestionTitleDefaultProps.title,
  level: QuestionTitleDefaultProps.level as QuestionTitleProps["level"]
});

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionPropsCom">
    <el-form ref="formRef" :model="formData" label-position="top">
      <el-form-item :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]" label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="标题等级" prop="level">
        <el-select v-model="formData.level" placeholder="请选择标题等级">
          <el-option label="一级标题" :value="1" />
          <el-option label="二级标题" :value="2" />
          <el-option label="三级标题" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label-position="left" label="是否居中" prop="isCenter">
        <el-checkbox v-model="formData.isCenter" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
