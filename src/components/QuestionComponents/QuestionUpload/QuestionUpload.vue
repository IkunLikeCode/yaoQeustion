<script setup lang="ts">
import type { QuestionUploadProps } from "./interface";
import { QuestionUploadDefaultProps } from "./interface";

const props = withDefaults(defineProps<QuestionUploadProps>(), {
  title: QuestionUploadDefaultProps.title,
  titleMaxLength: QuestionUploadDefaultProps.titleMaxLength,
  fileList: QuestionUploadDefaultProps.fileList as any
});
</script>

<template>
  <div class="QuestionUpload">
    <div class="title">{{ props.title }}</div>
    <div class="file-list">
      <div v-for="item in props.fileList" :key="item.url" class="file-item">
        <div v-if="item.url" class="file">
          <img :src="item.url" alt="人物图片" />
          <div class="file-name">{{ item.name }}</div>
        </div>
        <div v-else>
          <div class="file-warning">点击右侧可上传文件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.QuestionUpload {
  color: var(--main-text-color);
  pointer-events: none;
  box-sizing: border-box;
  padding-bottom: 10px;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .file-list {
    display: grid;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 100px;
    height: 100px;
    .file {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .file-name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 12px;
    }
    .file-warning {
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 12px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
