<!-- 上传文件组件 -->
<script setup lang="ts">
import { computed, shallowRef, useTemplateRef } from "vue";
import { useUserStore } from "@/store/module/user/userStore";
import { uploadFile } from "@/api/file/index";
import type { FileItem } from "@/api/file/type";
import { ElMessage } from "element-plus";
const emit = defineEmits<{
  (e: "uploadSuccess", fileItem: { name: string; url: string }, currentIndex: number): void;
  (e: "clearUrl", index: number): void;
}>();
const props = defineProps<{
  fileItem?: {
    name: string;
    url: string;
  };
  index: number;
  fileSize?: number;
  isDisabled?: boolean;
}>();
const inputRef = useTemplateRef<HTMLInputElement>("file-input");
const userStore = useUserStore();
const currentIndex = shallowRef<number>(-1);
const isDisabled = computed(() => props.isDisabled);
const clickUploadFile = (index: number) => {
  if (isDisabled.value) {
    return;
  }
  currentIndex.value = index;
  inputRef.value?.click();
};

// 处理文件上传
const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files?.length) {
    if (!limitFileType(files[0]!)) {
      return;
    }
    // 处理文件上传逻辑
    if (!limitImgSize(files[0]!)) {
      return;
    }
    const formData = new FormData();
    formData.append("file", files[0]!);
    formData.append("userId", userStore.userInfo.id || "");
    const result = await uploadFile<FileItem>(formData);
    if (result.fileUrl) {
      emit(
        "uploadSuccess",
        {
          name: files[0]?.name || "",
          url: result.fileUrl || ""
        },
        currentIndex.value
      );
    }
  }
};

const limitImgSize = (file: File) => {
  const { size, type } = file;
  if (type.indexOf("image") == -1) {
    return false;
  }
  if (props.fileSize) {
    if (size > props?.fileSize) {
      ElMessage.warning(`图片大小不能超过${props.fileSize / 1024 / 1024}MB`);
      return false;
    }
    return true;
  }
};

const limitFileType = (file: File) => {
  const { type } = file;
  if (type.indexOf("image") == -1) {
    ElMessage.warning("请上传图片文件");
    return false;
  }
  return true;
};

// 删除文件
const clickDeleteFile = (e: Event, index: number) => {
  if (isDisabled.value) {
    return;
  }
  e.stopPropagation();
  emit("clearUrl", index);
};
</script>

<template>
  <div class="UploadFile" @click="clickUploadFile(props.index)">
    <input ref="file-input" type="file" style="display: none" @change="handleFileChange" />
    <div v-if="props.fileItem?.url" class="img">
      <img :src="props.fileItem?.url" alt="图片" />
    </div>
    <div v-else class="file-name">+</div>
    <div class="delete" @click="clickDeleteFile($event, props.index)">
      <i class="iconfont icon-huishouzhan"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
.UploadFile {
  cursor: pointer;
  background-color: var(--main-bg-color);
  border: 1px solid rgb(196, 196, 196);
  font-size: 30px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  position: relative;
  .file-name {
    user-select: none;
  }
  .delete {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    line-height: 20px;
    color: #fff;
    background-color: rgba(202, 202, 202, 0.5);
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    padding: 2px 4px;
  }
  .img {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
