<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { reactive, useTemplateRef } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const formRef = useTemplateRef<FormInstance>("formRef");
const formData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  loginId: ""
});

const rules = reactive<FormRules<typeof formData>>({
  loginId: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { validator: loginIdValidate, trigger: "change" }
  ],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 12, message: "用户名长度必须在2到12位之间", trigger: "blur" },
    { validator: usernameValidate, trigger: "change" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度必须在6到12位之间", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: confirmPasswordValidate, trigger: "blur" },
    { min: 6, max: 12, message: "密码长度必须在6到12位之间", trigger: "blur" }
  ]
});

function confirmPasswordValidate(_rule: any, value: string, callback: any) {
  if (value !== formData.password) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
}
function loginIdValidate(_rule: any, value: string, callback: any) {
  const loginCount = String(value).length;
  if (loginCount < 6 || loginCount > 12) {
    callback(new Error("账号长度必须在6到12位之间"));
  }
}
function usernameValidate(_rule: any, value: string, callback: any) {
  // 不能包含特殊字符 比如< > 可以包含中文
  const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (!usernameRegex.test(value)) {
    callback(new Error("用户名不能包含特殊字符"));
  } else {
    callback();
  }
}

function register(ruleFormRef: FormInstance | null) {
  if (ruleFormRef) {
    ruleFormRef.validate(valid => {
      if (valid) {
        console.log("表单验证通过");
      } else {
        console.log("表单验证失败");
      }
    });
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
          <el-input v-model.number="formData.loginId" class="input" placeholder="请输入账号"></el-input>
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
        <el-form-item label-width="50%">
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
  background: linear-gradient(to right, #00c6fb, #3b80ef);
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
}
</style>
