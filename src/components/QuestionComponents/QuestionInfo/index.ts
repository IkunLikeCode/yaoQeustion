import { QuestionInfoDefaultProps } from "./interface";
import QuestionInfo from "./QuestionInfo.vue";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionInfoPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);
export * from "./interface";

export default {
  title: "问题信息",
  type: "questionInfo",
  Component: QuestionInfo,
  defaultProps: QuestionInfoDefaultProps,
  PropsCom: AsyncPropsCom
};
