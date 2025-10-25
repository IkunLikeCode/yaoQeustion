import QuestionCheckBox from "./QuestionCheckbox.vue";
import { QuestionCheckboxDefaultProps } from "./interface";
import QuestionCheckboxPropsCom from "./QuestionCheckboxPropsCom.vue";

import { markRaw } from "vue";
export * from "./interface";
export default {
  type: "questionCheckBox",
  title: "多选框",
  Component: markRaw(QuestionCheckBox),
  defaultProps: QuestionCheckboxDefaultProps,
  PropsCom: markRaw(QuestionCheckboxPropsCom)
};
