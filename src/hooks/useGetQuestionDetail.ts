import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "@/store/module/question";
export default function useGetQuestionDetail() {
  const questionStore = useQuestionStore();
  const route = useRoute();
  onMounted(() => {
    if (route.query.id) {
      questionStore.getQuestionDetailAction(route.query.id as string);
    }
  });
  onBeforeMount(() => {
    if (questionStore.componentsList.length) {
      questionStore.componentsList = [];
    }
  });
  return {
    componentsList: questionStore.componentsList
  };
}
