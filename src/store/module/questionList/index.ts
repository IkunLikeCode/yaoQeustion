import { getQuestionListByUserId } from "@/api/question";
import type { QuestionItem } from "@/page/Manage/List/type";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

interface pageInfo {
  userId: string;
  page: number;
  pageSize: number;
}

interface QuestionListType {
  questionList: QuestionItem[];
}

export const useQuestionList = defineStore("questionList", {
  state: (): QuestionListType => ({
    questionList: []
  }),
  actions: {
    async getQuestionListByUserIdAction(pageInfo: pageInfo) {
      try {
        const result = await getQuestionListByUserId<any>(pageInfo);
        this.questionList = result.list;
      } catch (err: any) {
        ElMessage.warning(err.message || "获取问卷列表失败");
      }
    },
    updateQuestion(newQuestionItem: QuestionItem) {
      const index = this.questionList.findIndex(item => item.id === newQuestionItem.id);
      if (index !== -1) {
        this.questionList[index] = newQuestionItem;
      }
    }
  }
});
