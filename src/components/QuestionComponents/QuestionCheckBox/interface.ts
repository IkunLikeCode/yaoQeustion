type item = {
  value: string;
  label: string;
};
export interface QuestionCheckboxProps {
  title?: string;
  options?: Array<item>;
  value?: Array<item>;
  isVertical?: boolean;
}
export const QuestionCheckboxDefaultProps: QuestionCheckboxProps = {
  title: "多选标题",
  options: [
    {
      value: "1",
      label: "选项1"
    },
    {
      value: "2",
      label: "选项2"
    },
    {
      value: "3",
      label: "选项3"
    }
  ],
  value: [],
  isVertical: false
};
