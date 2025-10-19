import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user/userStore";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStoreage";
// 动态导入所有 pageInfo 文件的函数

// 所有子路由配置
const pageInfosList: RouteRecordRaw[] = [];
// 所有根路由配置
const rootInfoList: RouteRecordRaw[] = [];
const loadAllPageInfos = async () => {
  // 目前已知的 pageInfo 文件
  // 这里可以扩展为自动扫描所有 pageInfo 文件
  const pageInfoFiles = import.meta.glob("../page/**/pageInfo.ts");
  for (const path in pageInfoFiles) {
    if (path.endsWith("/pageInfo.ts")) {
      const result: any = await pageInfoFiles[path]!();
      if (result.default.meta.isChild) {
        pageInfosList.push(result.default);
      } else {
        rootInfoList.push(result.default);
      }
    }
  }
  return pageInfosList;
};
// 登录后不让访问的页面
const loginRestrictedPaths = ["/login", "/register"];
await loadAllPageInfos();
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/MainLayout/MainLayout.vue"),
    redirect: "/home",
    children: [
      // 将所有 pageInfo 配置添加到路由中
      ...pageInfosList
    ]
  },
  ...rootInfoList
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach(async (to, _from, next) => {
  // 动态获取最新的token
  const questionToken = getLocalStorage("questionToken");
  // 如果没有token说明一定没有登录
  if (!questionToken) {
    // 如果访问的不是登录页，重定向到登录页
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
    return;
  }
  // 如果有token那么要验证token是否过期
  // 还要验证现在是否是登录状态,如果是登录状态,那么token过期也没有关系
  const userStore = useUserStore();
  if (questionToken) {
    try {
      if (loginRestrictedPaths.includes(to.path)) {
        next({ path: "/home" });
        return;
      }
      // 验证token是否过期 如果过期会抛出异常
      await userStore.getUserInfo();
      next();
    } catch (error: any) {
      if (!error.success) {
        // 说明token过期了,需要重新登录
        removeLocalStorage("questionToken");
        next({ path: "/login" });
        return;
      }
      next();
    }
  }
});

export default router;
