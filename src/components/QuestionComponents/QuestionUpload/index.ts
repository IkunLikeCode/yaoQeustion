import QuestionUpload from "./QuestionUpload.vue";
import { QuestionUploadDefaultProps } from "./interface";
import { markRaw, defineAsyncComponent } from "vue";
const AsyncPropsCom = markRaw(
  defineAsyncComponent({
    loader: () => import("./QuestionUploadPropsCom.vue"),
    delay: 100,
    timeout: 3000
  })
);

export * from "./interface";
export default {
  type: "questionUpload",
  title: "用户上传",
  defaultProps: QuestionUploadDefaultProps,
  Component: markRaw(QuestionUpload),
  PropsCom: AsyncPropsCom
};
