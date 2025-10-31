import { shallowRef } from "vue";
import { useQuestionList } from "@/store/module/questionList";
import type { pageInfo as PageInfo } from "@/store/module/questionList";
import { useRequest } from "./useRequest";
const questionListStore = useQuestionList();
interface options {
  state?: "all" | "isStar" | "isDelete";
  pageInfo: PageInfo;
  delay?: number;
}

export function useQuestionSearch(options: options) {
  const searchText = shallowRef("");
  const { callBack: searchHandle } = useRequest(
    async () => {
      questionListStore.getQuestionListByUserIdAction({
        ...options.pageInfo,
        searchText: searchText.value || ""
      });
      searchText.value = "";
    },

    { debounceDelay: options.delay || 500, isDebounce: true }
  );
  return {
    searchText,
    searchHandle
  };
}
