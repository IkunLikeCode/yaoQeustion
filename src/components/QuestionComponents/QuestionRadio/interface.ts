import randomId from "@/utils/radomId";
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
      value: randomId(),
      label: "选项1"
    },
    {
      value: randomId(),
      label: "选项2"
    },
    {
      value: randomId(),
      label: "选项3"
    }
  ],
  value: "1",
  isVertical: false,
  isDisabled: false,
  titleMaxLength: 20
};
