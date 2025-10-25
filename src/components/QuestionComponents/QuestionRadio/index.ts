import { markRaw } from "vue";
import { QuestionRadioDefaultProps } from "./interface";
import QuestionRadio from "./QuestionRadio.vue";
import QuestionRadioPropsCom from "./QuestionRadioPropsCom.vue";
export * from "./interface";
export default {
  type: "questionRadio",
  title: "单选框",
  Component: markRaw(QuestionRadio),
  defaultProps: QuestionRadioDefaultProps,
  PropsCom: markRaw(QuestionRadioPropsCom)
};
