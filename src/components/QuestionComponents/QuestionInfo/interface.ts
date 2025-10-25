export interface QuestionInfoProps {
  title?: string;
  description?: string;
  level?: 1 | 2 | 3;
  // 给属性组件使用的回调函数
  onChange?: (props: QuestionInfoProps) => void;
  isDisabled?: boolean;
}

export const QuestionInfoDefaultProps = {
  title: "问题标题",
  description: "问题描述",
  level: 1 as QuestionInfoProps["level"]
};
