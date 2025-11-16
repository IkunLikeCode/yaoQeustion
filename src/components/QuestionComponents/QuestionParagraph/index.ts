export * from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";
import QuestionParagraph from "./QuestionParagraph.vue";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionParagraphPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
//
export default {
  title: "段落",
  type: "questionParagraph",
  Component: markRaw(QuestionParagraph),
  defaultProps: QuestionParagraphDefaultProps,
  PropsCom: AsyncPropsCom
};
