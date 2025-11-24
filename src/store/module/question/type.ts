import type { QuestionItem } from "@/page/Manage/List/type";
import type { ComponentInfoType } from ".";

export interface QuestionDetail extends QuestionItem {
  author: string;
  bgMainColor: string;
  componentsList: ComponentInfoType[];
  js: string;
  css: string;
  updatedAt: string;
  textMainColor: string;
}

export const Options = ["questionRadio", "questionCheckBox"];
