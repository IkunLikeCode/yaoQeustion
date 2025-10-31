import { getQuestionListByUserId } from "@/api/question";
import type { QuestionItem } from "@/page/Manage/List/type";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

export interface pageInfo {
  userId?: string;
  page: number;
  pageSize: number;
  state?: "all" | "isStar" | "isDelete";
  searchText?: string;
}

interface QuestionListType {
  questionList: QuestionItem[];
  total: number;
  starQuestionList: QuestionItem[];
  deleteQuestionList: QuestionItem[];
}

export const useQuestionList = defineStore("questionList", {
  state: (): QuestionListType => ({
    questionList: [],
    total: 0,
    starQuestionList: [],
    deleteQuestionList: []
  }),
  actions: {
    async getQuestionListByUserIdAction(pageInfo: pageInfo) {
      try {
        const result = await getQuestionListByUserId<any>({
          ...pageInfo,
          searchText: pageInfo.searchText || ""
        });
        if (pageInfo.state === "isStar") {
          this.starQuestionList = result.list;
        } else if (pageInfo.state === "isDelete") {
          this.deleteQuestionList = result.list;
        } else {
          this.questionList = result.list;
        }
        this.total = result.total;
      } catch (err: any) {
        ElMessage.warning(err.message || "获取问卷列表失败");
      }
    },
    updateQuestion(newQuestionItem: QuestionItem, state?: "all" | "isStar" | "isDelete") {
      if (state === "isStar") {
        const starIndex = this.starQuestionList.findIndex(item => item.id === newQuestionItem.id);
        if (starIndex !== -1) {
          this.starQuestionList[starIndex] = newQuestionItem;
        }
      } else if (state === "all") {
        const index = this.questionList.findIndex(item => item.id === newQuestionItem.id);
        if (index !== -1) {
          this.questionList[index] = newQuestionItem;
        }
      } else if (state === "isDelete") {
        const deleteIndex = this.deleteQuestionList.findIndex(item => item.id === newQuestionItem.id);
        if (deleteIndex !== -1) {
          this.deleteQuestionList[deleteIndex] = newQuestionItem;
        }
      }
    }
  }
});
