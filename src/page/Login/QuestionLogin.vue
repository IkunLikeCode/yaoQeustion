<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
</script>

<template>
  <div class="login">
    <div class="container">
      <el-form> </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #00c6fb, #3b80ef);
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  .container {
    height: 400px;
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
  }
}
</style>
