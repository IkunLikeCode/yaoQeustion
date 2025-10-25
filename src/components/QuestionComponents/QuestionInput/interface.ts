export interface QuestionInputProps {
  title?: string;
  placeholder?: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
  // 给属性组件使用的回调函数
  onChange?: (props: QuestionInputProps) => void;
  isDisabled?: boolean;
}

export const QuestionInputDefaultProps = {
  title: "单行输入",
  placeholder: "请输入",
  titleMaxLength: 20,
  descriptionMaxLength: 30
};
