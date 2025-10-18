import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 动态导入所有 pageInfo 文件的函数
const loadAllPageInfos = async () => {
  // 目前已知的 pageInfo 文件
  const pageInfos: RouteRecordRaw[] = [];
  // 这里可以扩展为自动扫描所有 pageInfo 文件
  const pageInfoFiles = import.meta.glob("../page/**/pageInfo.ts");
  for (const path in pageInfoFiles) {
    if (path.endsWith("/pageInfo.ts")) {
      const result: any = await pageInfoFiles[path]!();
      pageInfos.push(result.default);
    }
  }
  return pageInfos;
};

// 获取所有页面配置
const pageInfos = await loadAllPageInfos();

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/MainLayout/MainLayout.vue"),
    redirect: "/home",
    children: [
      // 将所有 pageInfo 配置添加到路由中
      ...pageInfos
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
