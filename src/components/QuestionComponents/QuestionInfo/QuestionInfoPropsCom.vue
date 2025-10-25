<script setup lang="ts">
import type { QuestionInfoProps } from "./interface";
import { QuestionInfoDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ElForm, ElFormItem, ElSelect, ElInput, ElOption } from "element-plus";
const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionInfoProps>(), QuestionInfoDefaultProps);

// 使用 hook 来处理表单数据和事件
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionInfoPropsCom">
    <el-form :model="formData" label-position="top">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: ['blur'] }]">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="标题" prop="level">
        <el-select v-model="formData.level" placeholder="请选择类型">
          <el-option label="一级标题" :value="1" />
          <el-option label="二级标题" :value="2" />
          <el-option label="三级标题" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" autosize />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
