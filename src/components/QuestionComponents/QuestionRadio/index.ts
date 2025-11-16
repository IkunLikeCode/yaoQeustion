import { QuestionRadioDefaultProps } from "./interface";
import QuestionRadio from "./QuestionRadio.vue";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionRadioPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";
export default {
  type: "questionRadio",
  title: "单选框",
  Component: markRaw(QuestionRadio),
  defaultProps: QuestionRadioDefaultProps,
  PropsCom: AsyncPropsCom
};
