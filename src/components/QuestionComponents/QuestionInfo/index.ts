import { QuestionInfoDefaultProps } from "./interface";
import QuestionInfo from "./QuestionInfo.vue";
import QuestionInfoPropsCom from "./QuestionInfoPropsCom.vue";
export * from "./interface";

export default {
  title: "问题信息",
  type: "questionInfo",
  Component: QuestionInfo,
  defaultProps: QuestionInfoDefaultProps,
  PropsCom: QuestionInfoPropsCom
};
