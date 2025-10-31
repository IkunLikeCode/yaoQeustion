import type { RouteRecordRaw } from "vue-router";
export default {
  path: "/question",
  name: "Question",
  meta: {
    title: "问卷管理",
    icon: "question",
    isChild: false
  },
  component: () => import("@/layout/QuestionLayout/QuestionLayout.vue"),
  children: [
    {
      path: "/question/edit",
      name: "EditQuestion",
      component: () => import("./Edit/EditQuestion.vue")
    },
    {
      path: "/question/statistic",
      name: "StatisticsQuestion",
      component: () => import("./Statistics/StatisticsQuestion.vue")
    }
  ]
} as RouteRecordRaw;
