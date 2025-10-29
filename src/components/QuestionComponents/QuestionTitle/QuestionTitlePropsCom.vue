<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElCheckbox, type FormInstance } from "element-plus";
import { QuestionTitleDefaultProps, type QuestionTitleProps } from "./interface";
import { ref } from "vue";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import randomId from "@/utils/radomId";
const emit = defineEmits(["change"]);
const formRef = ref<FormInstance | null>(null);
const formId = `title-form-${randomId()}`;

const props = withDefaults(defineProps<QuestionTitleProps>(), QuestionTitleDefaultProps);

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionPropsCom">
    <el-form :id="formId" ref="formRef" :model="formData" label-position="top" :disabled="props.isDisabled">
      <el-form-item :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]" label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" :maxlength="props.titleMaxLength" show-word-limit />
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
