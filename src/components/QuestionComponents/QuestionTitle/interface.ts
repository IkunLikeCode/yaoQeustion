export interface QuestionTitleProps {
  title?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;
  titleMaxLength?: number;
  isDisabled?: boolean;
}

export const QuestionTitleDefaultProps = {
  title: "一行标题",
  level: 1 as QuestionTitleProps["level"],
  isCenter: false,
  isDisabled: false,
  titleMaxLength: 25
};
