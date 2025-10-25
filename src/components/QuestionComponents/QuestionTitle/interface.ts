export interface QuestionTitleProps {
  title?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;
  // 给属性组件使用的回调函数
  onChange?: (props: QuestionTitleProps) => void;
  isDisabled?: boolean;
}

export const QuestionTitleDefaultProps = {
  title: "一行标题",
  level: 1 as QuestionTitleProps["level"],
  isCenter: false
};
