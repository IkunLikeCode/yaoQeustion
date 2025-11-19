<script setup lang="ts">
import { ElInput, ElButton, ElMessage } from "element-plus";
import { useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const copyLink = () => {
  inputRef.value?.select();
  document.execCommand("copy");
  ElMessage.success("复制成功");
};
</script>

<template>
  <div class="LinkPanel">
    <div class="goback">
      <el-button @click="router.back()">返回</el-button>
    </div>
    <div>
      <el-input
        ref="inputRef"
        class="link"
        :value="'http://localhost:3000/question/' + route.query.id"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-button type="primary" @click="copyLink">复制</el-button>
    </div>
    <div></div>
  </div>
</template>

<style lang="less" scoped>
.LinkPanel {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .link {
    padding: 5px;
    box-sizing: border-box;
    width: 800px;
  }
}
</style>
