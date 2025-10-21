export interface QuestionTitleProps {
  title?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;
}

export const QuestionTitleDefaultProps = {
  title: "标题",
  level: 1 as QuestionTitleProps["level"],
  isCenter: true
};
