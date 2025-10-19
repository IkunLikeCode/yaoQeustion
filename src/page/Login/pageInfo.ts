import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/login",
  name: "Login",
  meta: {
    title: "登录",
    icon: "login",
    isChild: true
  },
  component: () => import("@/page/Login/QuestionLogin.vue")
} as RouteRecordRaw;
