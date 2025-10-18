import type { RouteRecordRaw } from "vue-router";
export default {
  path: "/home",
  name: "Home",
  meta: {
    title: "首页",
    icon: "home"
  },
  component: () => import("@/page/Home/HomePage.vue")
} as RouteRecordRaw;
