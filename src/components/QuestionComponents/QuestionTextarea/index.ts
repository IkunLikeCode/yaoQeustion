import QuestionTextarea from "./QuestionTextarea.vue";
import { QuestionTextareaDefaultProps } from "./interface";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionTextareaPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";

export default {
  title: "文本框",
  type: "questionTextarea",
  Component: QuestionTextarea,
  defaultProps: QuestionTextareaDefaultProps,
  PropsCom: AsyncPropsCom
};
