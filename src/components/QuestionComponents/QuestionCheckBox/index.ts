import QuestionCheckBox from "./QuestionCheckbox.vue";
import { QuestionCheckboxDefaultProps } from "./interface";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionCheckboxPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";
export default {
  type: "questionCheckBox",
  title: "多选框",
  Component: markRaw(QuestionCheckBox),
  defaultProps: QuestionCheckboxDefaultProps,
  PropsCom: AsyncPropsCom
};
