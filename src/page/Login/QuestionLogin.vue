<script setup lang="ts">
import { useTemplateRef, shallowReactive } from "vue";
import { ElForm, ElFormItem, ElInput, ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user/userStore";
import { loginIdValidate } from "@/utils/formValidate";
import type { LoginInfoType } from "@/api/user/type";

const formRef = useTemplateRef<FormInstance | null>("formRef");
const formData = shallowReactive<LoginInfoType>({
  loginId: "",
  password: ""
});
const rules = shallowReactive<FormRules<typeof formData>>({
  loginId: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { validator: loginIdValidate, trigger: "change" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码长度必须在6到12位之间", trigger: "blur" }
  ]
});

const router = useRouter();
const userStore = useUserStore();

async function login(ruleFormRef: FormInstance | null) {
  if (ruleFormRef) {
    const valid = await ruleFormRef.validate();
    if (valid) {
      try {
        await userStore.userLogin(formData);
        router.push("/");
      } catch (error: any) {
        ElMessage.error(error.message || "登录失败");
      }
    } else {
      ElMessage.error("请填写完整信息");
    }
  }
}
</script>

<template>
  <div class="login">
    <div class="container">
      <div class="title">用户登录</div>
      <el-form ref="formRef" :rules="rules" :model="formData" label-position="right" class="form">
        <el-form-item label="账号:" prop="loginId">
          <el-input v-model.trim="formData.loginId" class="input" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model.trim="formData.password"
            class="input"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="router.push('/register')">注册账号</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #30cfd0, #9a7dbe);
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
    padding: 20px;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    .title {
      font-size: 30px;
      user-select: none;
      font-weight: 600;
      color: #000;
      margin-bottom: 20px;
    }
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
