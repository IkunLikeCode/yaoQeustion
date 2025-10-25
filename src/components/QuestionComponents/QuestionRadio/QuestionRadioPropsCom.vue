<script setup lang="ts">
import type { QuestionRadioProps } from "./interface";
import { QuestionRadioDefaultProps } from "./interface";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import { ElForm, ElFormItem, ElSelect, ElOption, ElInput, ElButton } from "element-plus";
import randomId from "@/utils/radomId";
const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionRadioProps>(), {
  title: QuestionRadioDefaultProps.title,
  options: () => JSON.parse(JSON.stringify(QuestionRadioDefaultProps.options)),
  value: QuestionRadioDefaultProps.value,
  isVertical: QuestionRadioDefaultProps.isVertical
});
const { formData } = useMonitorUserInput(props, emit);
// 添加选项
const addOption = () => {
  formData.options.push({
    label: "",
    value: randomId()
  });
};
// 删除选项
const removeOption = (index: number) => {
  formData.options.splice(index, 1);
};
// 验证formData中的options的label是否为空
const validateOptionsLabel = (index: number) => {
  return formData.options[index]!.label.trim() !== "";
};
</script>

<template>
  <div class="QuestionRadioPropsCom">
    <el-form :model="formData" label-position="top">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="选项列表" prop="options">
        <div class="choice-list">
          <div v-for="(item, index) in formData.options" :key="item.value" class="option-item">
            <div class="option-item">
              <div class="option-input">
                <el-input
                  v-model="item.label"
                  placeholder="请输入选项"
                  :class="{ errorInput: !validateOptionsLabel(index) }"
                ></el-input>
                <div v-if="!validateOptionsLabel(index)" class="error">选项不能为空</div>
              </div>
              <el-button v-if="index > 1" circle size="default" @click="removeOption(index)">
                <i class="iconfont icon-huishouzhan"></i>
              </el-button>
            </div>
          </div>
          <div class="addOptions" @click="addOption">添加选项</div>
        </div>
      </el-form-item>
      <el-form-item label="选项" prop="options">
        <el-select v-model="formData.value" placeholder="请选择选项">
          <el-option
            v-for="item in props.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否垂直" prop="isVertical">
        <el-switch v-model="formData.isVertical"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.QuestionRadioPropsCom {
  .option-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
  }
  .option-input {
    width: 100%;
    // margin-bottom: 8px;
    .error {
      color: var(--el-color-danger);
      font-size: 12px;
      left: 0;
      line-height: 1;
      padding-top: 2px;
      position: absolute;
    }
  }
  .addOptions {
    color: var(--main-color);
    cursor: pointer;
  }
  .choice-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
