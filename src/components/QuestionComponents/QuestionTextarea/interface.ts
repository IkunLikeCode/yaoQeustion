export interface QuestionTextareaProps {
  title?: string;
  content?: string;
  isDisabled?: boolean;
  titleMaxLength?: number;
  contentMaxLength?: number;
}
export const QuestionTextareaDefaultProps: QuestionTextareaProps = {
  title: "多行输入标题",
  content: "请输入内容",
  titleMaxLength: 20,
  contentMaxLength: 200,
  isDisabled: false
};
