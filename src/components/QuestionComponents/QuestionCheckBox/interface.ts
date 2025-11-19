import randomId from "@/utils/radomId";

type item = {
  value: string;
  label: string;
};
export interface QuestionCheckboxProps {
  title?: string;
  options?: Array<item>;
  value?: Array<item>;
  isVertical?: boolean;
  isDisabled?: boolean;
  titleMaxLength?: number;
  optionMaxLength?: number;
}
export const QuestionCheckboxDefaultProps: QuestionCheckboxProps = {
  title: "多选标题",
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
  value: [],
  isVertical: false,
  isDisabled: false,
  titleMaxLength: 20,
  optionMaxLength: 30
};
