import type { RouteRecordRaw } from "vue-router";

export default {
  // 如果路由没有匹配到任何路由，就会匹配到这个路由
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  meta: {
    title: "404",
    isChild: true
  },
  component: () => import("./NotFound.vue")
} as RouteRecordRaw;
