import QuestionTitle from "./QuestionTitle.vue";
import { QuestionTitleDefaultProps } from "./interface";
export * from "./interface";
export default {
  title: "标题",
  type: "questionTitle",
  Component: QuestionTitle,
  defaultProps: QuestionTitleDefaultProps
};
