import QuestionTextarea from "./QuestionTextarea.vue";
import { QuestionTextareaDefaultProps } from "./interface";
import QuestionTextareaPropsCom from "./QuestionTextareaPropsCom.vue";
export * from "./interface";

export default {
  title: "文本框",
  type: "questionTextarea",
  Component: QuestionTextarea,
  defaultProps: QuestionTextareaDefaultProps,
  PropsCom: QuestionTextareaPropsCom
};
