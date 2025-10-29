export interface QuestionParagraphProps {
  title?: string;
  isCenter?: boolean;
  maxLength?: number;
  isDisabled?: boolean;
}

// 默认值
export const QuestionParagraphDefaultProps: QuestionParagraphProps = {
  title: "一行段落",
  isCenter: false,
  maxLength: 100,
  isDisabled: false
};
