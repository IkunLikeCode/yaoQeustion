import { onMounted, reactive } from "vue";
import { useQuestionList } from "@/store/module/questionList";
import { useUserStore } from "@/store/module/user/userStore";
import type { pageInfo } from "@/store/module/questionList";
import type { QuestionItem } from "@/page/Manage/List/type";
const useQuestionListStore = useQuestionList();
const userStore = useUserStore();
interface GetQuestionListOptions {
  state?: "all" | "isStar" | "isDelete";
  searchText?: string;
}

export function useGetQuestionList(options: GetQuestionListOptions = {}) {
  const pageInfo = reactive<pageInfo>({
    userId: userStore.userInfo.id,
    page: 1,
    pageSize: 5,
    ...options
  });
  const changePage = (value: number) => {
    pageInfo.page = value;
    useQuestionListStore.getQuestionListByUserIdAction(pageInfo);
  };
  const updateQuestion = (newQuestionItem: QuestionItem) => {
    useQuestionListStore.updateQuestion(newQuestionItem, pageInfo.state);
  };
  onMounted(() => {
    useQuestionListStore.getQuestionListByUserIdAction(pageInfo);
  });
  return {
    changePage,
    pageInfo,
    updateQuestion,
    getQuestionListByUserIdAction: (pageInfo: pageInfo) => {
      return useQuestionListStore.getQuestionListByUserIdAction(pageInfo);
    }
  };
}
