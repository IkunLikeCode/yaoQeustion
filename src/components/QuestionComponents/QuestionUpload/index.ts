import QuestionUpload from "./QuestionUpload.vue";
import QuestionUploadPropsCom from "./QuestionUploadPropsCom.vue";
import { QuestionUploadDefaultProps } from "./interface";
import { markRaw } from "vue";

export * from "./interface";
export default {
  type: "questionUpload",
  title: "用户上传",
  defaultProps: QuestionUploadDefaultProps,
  Component: markRaw(QuestionUpload),
  PropsCom: markRaw(QuestionUploadPropsCom)
};
