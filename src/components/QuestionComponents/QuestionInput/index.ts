import QuestionInput from "./QuestionInput.vue";
import { QuestionInputDefaultProps } from "./interface";
export * from "./interface";
export default {
  title: "输入框",
  type: "questionInput",
  Component: QuestionInput,
  defaultProps: QuestionInputDefaultProps
};
