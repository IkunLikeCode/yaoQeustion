import QuestionTitle from "./QuestionTitle.vue";
import { QuestionTitleDefaultProps } from "./interface";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionTitlePropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";
export default {
  title: "标题",
  type: "questionTitle",
  Component: markRaw(QuestionTitle),
  defaultProps: QuestionTitleDefaultProps,
  PropsCom: AsyncPropsCom
};
