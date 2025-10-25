export * from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";
import QuestionParagraph from "./QuestionParagraph.vue";
import QuestionParagraphPropsCom from "./QuestionParagraphPropsCom.vue";
import { markRaw } from "vue";
//
export default {
  title: "段落",
  type: "questionParagraph",
  Component: markRaw(QuestionParagraph),
  defaultProps: QuestionParagraphDefaultProps,
  PropsCom: markRaw(QuestionParagraphPropsCom)
};
