<script setup lang="ts">
import { QuestionUploadDefaultProps, type QuestionUploadProps } from "./interface";
import { ElInput, ElForm, ElFormItem } from "element-plus";
import useMonitorUserInput from "@/hooks/useMonitorUserInput";
import UploadFile from "./UploadFile.vue";
const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<QuestionUploadProps>(), {
  title: QuestionUploadDefaultProps.title,
  titleMaxLength: QuestionUploadDefaultProps.titleMaxLength,
  fileList: QuestionUploadDefaultProps.fileList as any,
  fileSize: QuestionUploadDefaultProps.fileSize,
  isDisabled: QuestionUploadDefaultProps.isDisabled
});
const { formData } = useMonitorUserInput(props, emit);

const removeFile = (index: number) => {
  formData.fileList.splice(index, 1);
};

const handleUploadSuccess = (fileItem: { name: string; url: string }, currentIndex: number) => {
  formData.fileList[currentIndex] = fileItem;
};
const clearUrl = (index: number) => {
  if (formData.fileList[index]) {
    formData.fileList[index].url = "";
    formData.fileList[index].name = "";
  }
};
</script>

<template>
  <div class="QuestionUploadPropsCom">
    <el-form :model="formData" label-position="top" :disabled="props.isDisabled">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input v-model="formData.title" :maxlength="props.titleMaxLength" placeholder="请输入标题" show-word-limit />
      </el-form-item>
      <el-form-item label="文件列表">
        <div class="file-list">
          <template v-for="(item, index) in formData.fileList" :key="index">
            <div class="file-item">
              <UploadFile
                :file-item="item"
                :index="index"
                :file-size="props.fileSize || 1024 * 1024 * 2"
                :is-disabled="props.isDisabled"
                @upload-success="handleUploadSuccess"
                @clear-url="clearUrl"
              />
              <div class="option">
                <el-input
                  v-model="item.name"
                  style="width: 120px"
                  placeholder="请输入"
                  show-word-limit
                  :maxlength="10"
                />
                <el-button v-if="index > 1" type="danger" size="small" @click="removeFile(index)">删除</el-button>
              </div>
            </div>
          </template>
          <div class="add-file">
            <el-button type="primary" size="small" @click="formData.fileList.push({ name: '', url: '' })"
              >添加文件</el-button
            >
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.QuestionUploadPropsCom {
  color: var(--main-text-color);
  box-sizing: border-box;
  padding-bottom: 10px;
  width: 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .file-list {
    display: flex;
    gap: 20px;
    flex-direction: column;
    width: 100%;
    .file-item {
      display: flex;
      align-items: center;
      gap: 10px;
      .option {
        display: flex;
        gap: 5px;
        flex-direction: column;
      }
    }
  }
}
</style>
