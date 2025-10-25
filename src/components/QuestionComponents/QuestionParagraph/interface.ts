export interface QuestionParagraphProps {
  title?: string;
  isCenter?: boolean;
  maxLength?: number;
}

// 默认值
export const QuestionParagraphDefaultProps: QuestionParagraphProps = {
  title: "一行段落",
  isCenter: false,
  maxLength: 30
};
