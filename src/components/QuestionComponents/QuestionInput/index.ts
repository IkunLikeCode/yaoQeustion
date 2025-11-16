import QuestionInput from "./QuestionInput.vue";
import { QuestionInputDefaultProps } from "./interface";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuetionsInputPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";
export default {
  title: "输入框",
  type: "questionInput",
  Component: QuestionInput,
  defaultProps: QuestionInputDefaultProps,
  PropsCom: AsyncPropsCom,
  minLength: 0,
  maxLength: 20
};
