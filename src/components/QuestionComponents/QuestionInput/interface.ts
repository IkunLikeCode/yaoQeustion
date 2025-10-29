export interface QuestionInputProps {
  title?: string;
  placeholder?: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
  isDisabled?: boolean;
}

export const QuestionInputDefaultProps = {
  title: "单行输入",
  placeholder: "请输入",
  titleMaxLength: 20,
  descriptionMaxLength: 30,
  isDisabled: false
};
