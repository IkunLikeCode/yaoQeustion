import { markRaw } from "vue";
import QuestionTitle from "./QuestionTitle.vue";
import { QuestionTitleDefaultProps } from "./interface";
import QuestionTitlePropsCom from "./QuestionTitlePropsCom.vue";
export * from "./interface";
export default {
  title: "标题",
  type: "questionTitle",
  Component: markRaw(QuestionTitle),
  defaultProps: QuestionTitleDefaultProps,
  PropsCom: markRaw(QuestionTitlePropsCom)
};
