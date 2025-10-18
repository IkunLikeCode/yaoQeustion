import type { RouteRecordRaw } from "vue-router";

export default {
  path: "/register",
  name: "Register",
  meta: {
    title: "注册",
    icon: "register"
  },
  component: () => import("@/page/Register/QuestionRegister.vue")
} as RouteRecordRaw;
