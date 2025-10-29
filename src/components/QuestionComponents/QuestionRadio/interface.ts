type item = {
  value: string;
  label: string;
};
export interface QuestionRadioProps {
  title?: string;
  options?: Array<item>;
  value?: string;
  isVertical?: boolean;
  isDisabled?: boolean;
  titleMaxLength?: number;
}
export const QuestionRadioDefaultProps: QuestionRadioProps = {
  title: "单选标题",
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
  value: "1",
  isVertical: false,
  isDisabled: false,
  titleMaxLength: 20
};
