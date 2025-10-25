export interface QuestionTextareaProps {
  title?: string;
  content?: string;
  // 给属性组件使用的回调函数
  onChange?: (props: QuestionTextareaProps) => void;
  isDisabled?: boolean;
  titleMaxLength?: number;
  contentMaxLength?: number;
}
export const QuestionTextareaDefaultProps: QuestionTextareaProps = {
  title: "多行输入",
  content: "请输入内容",
  titleMaxLength: 20,
  contentMaxLength: 200
};
