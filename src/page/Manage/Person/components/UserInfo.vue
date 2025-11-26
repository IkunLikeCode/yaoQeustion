<!-- 展示用户信息和更改用户信息 -->
<script setup lang="ts">
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElMessage, type FormInstance } from "element-plus";
import { useUserStore } from "@/store/module/user/userStore";
import { storeToRefs } from "pinia";
import { shallowRef, useTemplateRef } from "vue";
import { uploadFile } from "@/api/file/index";
import type { FileItem } from "@/api/file/type";
import { updateUserInfo } from "@/api/user/index";
const userStore = useUserStore();
const avatarInput = useTemplateRef<HTMLInputElement | null>("avatarInput");
const { userInfo } = storeToRefs(userStore);
const isEdit = shallowRef(false);
const formRef = useTemplateRef<FormInstance | null>("formRef");
// 切换编辑状态
const changeEdit = () => {
  isEdit.value = !isEdit.value;
};
const uploadAvatar = () => {
  if (avatarInput.value) {
    avatarInput.value.click();
  }
};
// 处理头像上传
const handleAvatarChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const formData = new FormData();
    formData.append("file", target.files[0] || "");
    // 限制文件类型
    if (!limitFileType(target.files[0] || null)) {
      ElMessage.warning("请上传图片文件");
      return;
    }
    // 限制文件4mb只支持图片格式
    if (!limitImgSize(target.files[0] || null)) {
      ElMessage.warning("图片大小不能超过4MB");
      return;
    }
    formData.append("userId", userInfo.value.id || "");
    // 调用上传头像的接口
    const res = await uploadFile<FileItem>(formData);
    if (res.fileName) {
      userInfo.value.avatar = res.fileUrl;
    }
  }
};
// 限制文件4mb只支持图片格式
const limitImgSize = (file: File | null) => {
  if (!file) {
    return false;
  }
  const { size, type } = file;
  if (type.indexOf("image") == -1) {
    return false;
  }
  if (size > 4 * 1024 * 1024) {
    return false;
  }
  return true;
};
// 限制文件类型
const limitFileType = (file: File | null) => {
  if (!file) {
    return false;
  }
  const { type } = file;
  if (type.indexOf("image") == -1) {
    return false;
  }
  return true;
};
// 提交用户信息
const saveInfo = async () => {
  if (formRef.value) {
    await formRef.value.validate(async valid => {
      if (!valid) {
        ElMessage.warning("请填写完整信息");
        return;
      } else {
        try {
          await updateUserInfo({
            username: userInfo.value.username,
            nickname: userInfo.value.nickname,
            avatar: userInfo.value.avatar
          });
          changeEdit();
        } catch (err: any) {
          ElMessage.error(err.message || "更新用户信息失败");
        }
      }
    });
  }
};
</script>

<template>
  <div class="userInfo">
    <el-card v-if="!isEdit" class="el-card--primary">
      <template #header>
        <div class="option">
          <span class="title">用户信息</span>
          <el-button type="primary" size="small" @click="changeEdit">编辑</el-button>
        </div>
      </template>
      <template #default>
        <div class="userInfoContent">
          <div class="userInfoItem">
            <span class="label">用户头像:</span>
            <el-image
              :src="userInfo.avatar"
              fit="fill"
              :preview-src-list="[userInfo.avatar]"
              style="width: 50px; height: 50px; border-radius: 50%"
            />
          </div>
          <div class="userInfoItem">
            <span class="label">用户名:</span>
            <span class="value">{{ userInfo.username }}</span>
          </div>
          <div class="userInfoItem">
            <span class="label">昵称:</span>
            <span class="value">{{ userInfo.nickname }}</span>
          </div>
        </div>
      </template>
    </el-card>
    <el-card v-else class="el-card--primary">
      <template #header>
        <div class="option">
          <span class="title">用户信息</span>
          <el-button type="primary" size="small" @click="saveInfo">保存</el-button>
        </div>
      </template>
      <template #default>
        <el-form ref="formRef" :model="userInfo" label-width="70px">
          <el-form-item
            :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
            label="用户名"
            prop="username"
          >
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
            label="昵称"
            prop="nickname"
          >
            <el-input v-model="userInfo.nickname" />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <img :src="userInfo.avatar" alt="avatar" class="avatar" @click="uploadAvatar" />
            <input ref="avatarInput" type="file" style="display: none" @change="handleAvatarChange" />
          </el-form-item>
        </el-form>
      </template>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.userInfo {
  width: 100%;
  height: 100%;
  .el-card--primary {
    height: 100%;
    width: 100%;
    .option {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .userInfoContent {
      display: flex;
      flex-direction: column;
      gap: 30px;
      .userInfoItem {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
    .avatar {
      width: 100px;
      height: 100px;
      cursor: pointer;
      border: 1px solid rgb(196, 196, 196);
    }
  }
}
</style>
