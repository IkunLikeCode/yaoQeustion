<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { reactive, useTemplateRef } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/module/user/userStore";
import { useRouter } from "vue-router";
import { usernameValidate, loginIdValidate } from "@/utils/formValidate";
const router = useRouter();
const userStore = useUserStore();
const formRef = useTemplateRef<FormInstance>("formRef");
const formData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  loginId: ""
});

const rules = reactive<FormRules<typeof formData>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 12, message: "用户名长度必须在2到12位之间", trigger: "blur" },
    { validator: usernameValidate, trigger: "change" }
  ],
  loginId: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { validator: loginIdValidate, trigger: "change" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度必须在6到12位之间", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度必须在6到12位之间", trigger: "blur" },
    { validator: confirmPasswordValidate, trigger: "change" }
  ]
});

function confirmPasswordValidate(_rule: any, value: string, callback: any) {
  if (value !== formData.password) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
}

async function register(ruleFormRef: FormInstance | null) {
  if (ruleFormRef) {
    const valid = await ruleFormRef.validate();
    if (valid) {
      try {
        await userStore.userRegister(formData);
        router.push("/login");
      } catch (error: any) {
        ElMessage.error(error.message || "注册失败");
      }
    } else {
      ElMessage.error("请填写完整信息");
    }
  }
}
</script>
<!-- 注册页面 -->
<template>
  <div class="register">
    <div class="container">
      <div class="title">用户注册</div>
      <el-form ref="formRef" :rules="rules" :model="formData" label-position="right" class="form">
        <el-form-item label="账号:" prop="loginId" label-width="90px">
          <el-input v-model.trim="formData.loginId" class="input" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="username" label-width="90px">
          <el-input v-model.trim="formData.username" class="input" type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" label-width="90px">
          <el-input
            v-model.trim="formData.password"
            class="input"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword" label-width="90px">
          <!-- 展示切换密码 -->
          <el-input
            v-model.trim="formData.confirmPassword"
            class="input"
            type="password"
            show-password
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="router.push('/login')">登录账号</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="register(formRef)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.register {
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #30cfd0, #9a7dbe);
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 30px;
    user-select: none;
    font-weight: 600;
    color: #000;
    margin-bottom: 20px;
  }
  .container {
    height: 400px;
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    .form {
      width: 100%;
      .input {
        width: 100%;
      }
    }
  }
  .btn {
    width: 100%;
  }
}
</style>
