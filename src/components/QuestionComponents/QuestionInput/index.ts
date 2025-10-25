import QuestionInput from "./QuestionInput.vue";
import { QuestionInputDefaultProps } from "./interface";
import QuestionInputPropsCom from "./QuetionsInputPropsCom.vue";
export * from "./interface";
export default {
  title: "输入框",
  type: "questionInput",
  Component: QuestionInput,
  defaultProps: QuestionInputDefaultProps,
  PropsCom: QuestionInputPropsCom,
  minLength: 0,
  maxLength: 20
};
