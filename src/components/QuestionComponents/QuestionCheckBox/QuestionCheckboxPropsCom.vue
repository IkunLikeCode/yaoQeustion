<script setup lang="ts">
import type { QuestionCheckboxProps } from "./interface";
import { QuestionCheckboxDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ElCheckboxGroup, ElCheckbox, ElForm, ElFormItem, ElInput, ElSwitch, ElButton } from "element-plus";
import randomId from "@/utils/radomId";
import { ref } from "vue";
import type { FormInstance } from "element-plus";

const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionCheckboxProps>(), {
  title: QuestionCheckboxDefaultProps.title,
  options: () => JSON.parse(JSON.stringify(QuestionCheckboxDefaultProps.options)),
  isVertical: QuestionCheckboxDefaultProps.isVertical,
  value: () => JSON.parse(JSON.stringify(QuestionCheckboxDefaultProps.value)),
  isDisabled: QuestionCheckboxDefaultProps.isDisabled,
  titleMaxLength: QuestionCheckboxDefaultProps.titleMaxLength
});

// 为每个组件实例创建唯一的表单引用
const formRef = ref<FormInstance | null>(null);
const formId = `checkbox-form-${randomId()}`;

const addOption = () => {
  formData.options.push({
    value: randomId(),
    label: ""
  });
};
const removeOption = (index: number) => {
  formData.options.splice(index, 1);
};
const { formData } = useMonitorUserInput(props, emit);
</script>

<template>
  <div class="QuestionCheckboxPropsCom">
    <el-form :id="formId" ref="formRef" label-position="top" :model="formData" class="form" :disabled="isDisabled">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input
          v-model="formData.title"
          placeholder="请输入标题"
          :maxlength="titleMaxLength"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="选项" prop="options">
        <!-- 垂直 -->
        <div class="checkbox-group-container">
          <el-checkbox-group v-model="formData.value as any" class="checkbox-group-column">
            <el-checkbox
              v-for="(item, index) in formData.options"
              :key="item.value"
              class="checkbox-item"
              :label="item.value"
            >
              <div class="checkbox-item-content">
                <el-input
                  v-model="item.label"
                  :maxlength="optionMaxLength"
                  show-word-limit
                  style="width: 200px"
                  placeholder="请输入选项"
                ></el-input>
                <el-button v-if="index > 1" circle size="default" @click="removeOption(index)">
                  <i class="iconfont icon-huishouzhan"></i>
                </el-button>
              </div>
            </el-checkbox>
          </el-checkbox-group>
          <el-form-item label-position="left">
            <div class="addOptions" @click="addOption">添加选项</div>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="是否竖向排列" label-position="left">
        <el-switch v-model="formData.isVertical"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.QuestionCheckboxPropsCom {
  width: 100%;
  .form {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .checkbox-group-column {
    display: flex;
    flex-direction: column;
    // 自动换行
    gap: 10px;
    .checkbox-item {
      display: flex;
      align-items: center;
      .checkbox-item-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    .checkbox-group-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .addOptions {
    font-size: 14px;
    color: var(--main-color);
    cursor: pointer;
  }
}
</style>
