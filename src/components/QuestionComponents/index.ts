import type { QuestionInputProps } from "./QuestionInput";
import type { QuestionTitleProps } from "./QuestionTitle";
import type { QuestionParagraphProps } from "./QuestionParagraph";
import type { QuestionInfoProps } from "./QuestionInfo";
import type { QuestionTextareaProps } from "./QuestionTextarea";
import type { QuestionRadioProps } from "./QuestionRadio";
import type { QuestionCheckboxProps } from "./QuestionCheckBox";
import type { QuestionUploadProps } from "./QuestionUpload";
import type { Component } from "vue";
import QuestionConfigInput from "./QuestionInput/index";
import QuestionConfigTitle from "./QuestionTitle/index";
import QuestionConfigParagraph from "./QuestionParagraph/index";
import QuestionConfigInfo from "./QuestionInfo/index";
import QuestionConfigTextarea from "./QuestionTextarea/index";
import QuestionConfigRadio from "./QuestionRadio/index";
import QuestionConfigCheckBox from "./QuestionCheckBox/index";
import QuestionConfigUpload from "./QuestionUpload/index";

export type ComponentPropsType =
  | QuestionInputProps
  | QuestionTitleProps
  | QuestionParagraphProps
  | QuestionInfoProps
  | QuestionTextareaProps
  | QuestionRadioProps
  | QuestionCheckboxProps
  | QuestionUploadProps;

// 每个组件的配置信息类型
export interface ComponentConfType {
  title: string;
  type: string;
  defaultProps: ComponentPropsType; // 每个组件的默认属性类型不同，使用 any
  Component: Component; // 组件本身
  PropsCom: Component; // 属性组件
  minLength?: number; // 可选的最小长度限制
  maxLength?: number; // 可选的最大长度限制
}

// 组件配置列表
export const componentList: ComponentConfType[] = [
  QuestionConfigInput,
  QuestionConfigTitle,
  QuestionConfigParagraph,
  QuestionConfigInfo,
  QuestionConfigTextarea,
  QuestionConfigRadio,
  QuestionConfigCheckBox,
  QuestionConfigUpload
];
// 对组件分组
export const componentGroup = [
  {
    groupKey: "text",
    title: "文本显示",
    componentList: [QuestionConfigTitle, QuestionConfigParagraph, QuestionConfigInfo]
  },
  {
    groupKey: "input",
    title: "用户输入",
    componentList: [QuestionConfigInput, QuestionConfigTextarea]
  },
  {
    groupKey: "choice",
    title: "用户选择",
    componentList: [QuestionConfigRadio, QuestionConfigCheckBox]
  },
  {
    groupKey: "upload",
    title: "用户上传",
    componentList: [QuestionConfigUpload]
  }
];

export function getComponentByType(type: string) {
  const result = componentList.find(item => item.type === type);
  return result;
}
