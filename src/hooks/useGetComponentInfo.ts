import { useQuestionStore } from "@/store/module/question";

export default function useGetComponentInfo() {
  const questionStore = useQuestionStore();
  const currentComponent = questionStore.componentsList.find(item => item.fe_id === questionStore.selectedId);
  return {
    componentList: questionStore.componentsList, //当前组件列表
    selectId: questionStore.selectedId, //当前选中的组件id
    currentComponent
  };
}
