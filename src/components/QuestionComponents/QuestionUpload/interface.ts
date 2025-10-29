export interface QuestionUploadProps {
  title?: string;
  titleMaxLength?: number;
  fileList?: {
    name: string;
    url: string;
  }[];
  fileSize?: number;
  isDisabled?: boolean;
}

export const QuestionUploadDefaultProps: QuestionUploadProps = {
  title: "选择你喜欢的人物",
  titleMaxLength: 10,
  fileList: [
    {
      name: "H",
      url: "https://blog123.tos-cn-beijing.volces.com/6311376679f979ad205a73a4e3026608.webp"
    },

    {
      name: "人物3",
      url: "https://blog123.tos-cn-beijing.volces.com/6311376679f979ad205a73a4e3026608.webp"
    },
    {
      name: "小鸟",
      url: "https://blog123.tos-cn-beijing.volces.com/83c34e5ff13d8325c36e4eea6c203c5c.png"
    }
  ],
  fileSize: 1024 * 1024 * 2,
  isDisabled: false
};
