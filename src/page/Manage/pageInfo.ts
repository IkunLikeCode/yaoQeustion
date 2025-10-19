// 每个页面的路由元信息 用来描述该页面
export default {
  path: "/manage",
  name: "Manage",
  meta: {
    title: "管理问卷",
    icon: "manage",
    isChild: true
  },
  component: () => import("@/layout/ManageLayout/ManageLayout.vue"),
  redirect: "/manage/listQuestion",
  children: [
    {
      path: "/manage/listQuestion",
      name: "ListQuestion",
      meta: {
        title: "问卷列表",
        icon: "listQuestion"
      },
      component: () => import("@/page/Manage/List/ListQeustion.vue")
    },
    {
      path: "/manage/starQuestion",
      name: "StarQuestion",
      meta: {
        title: "收藏问卷",
        icon: "starQuestion"
      },
      component: () => import("@/page/Manage/Star/StarQeustion.vue")
    },
    {
      path: "/manage/recycleBin",
      name: "RecycleBin",
      meta: {
        title: "回收站",
        icon: "recycleBin"
      },
      component: () => import("@/page/Manage/RecycleBin/RecycleBin.vue")
    }
  ]
};
