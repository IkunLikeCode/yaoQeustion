export interface QuestionInfoProps {
  title?: string;
  description?: string;
  level?: 1 | 2 | 3;
  isDisabled?: boolean;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
}

export const QuestionInfoDefaultProps = {
  title: "问题标题",
  description: "问题描述",
  level: 1 as QuestionInfoProps["level"],
  titleMaxLength: 20,
  descriptionMaxLength: 200,
  isDisabled: false
};
