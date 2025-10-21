import type { QuestionInputProps } from "./QuestionInput";
import type { QuestionTitleProps } from "./QuestionTitle";
import type { Component } from "vue";
import QuestionConfigInput from "./QuestionInput/index";
import QuestionConfigTitle from "./QuestionTitle/index";

export type ComponentPropsType = QuestionInputProps & QuestionTitleProps;

// 每个组件的配置信息类型
export interface ComponentConfType {
  title?: string;
  type?: string;
  defaultProps?: ComponentPropsType; //组件自身的属性
  Component?: Component<ComponentPropsType>; //组件本身
}

// 组件配置列表
export const componentList: ComponentConfType[] = [QuestionConfigInput, QuestionConfigTitle];
// 对组件分组
export const componentGroup = [
  {
    groupKey: "text",
    title: "文本显示",
    componentList: [QuestionConfigTitle]
  },
  {
    groupKey: "input",
    title: "用户输入",
    componentList: [QuestionConfigInput]
  }
];

export function getComponentByType(type: string) {
  const result = componentList.find(item => item.type === type);
  return result;
}
