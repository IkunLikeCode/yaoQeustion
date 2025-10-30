<script setup lang="ts">
import QuestionCardItem from "@/components/QuestionCardItem/QuestionCardItem.vue";
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { useQuestionList } from "@/store/module/questionList";
import { computed } from "vue";
import type { QuestionItem } from "./type";
const useQuestionListStore = useQuestionList();

const questionList = computed(() => {
  return useQuestionListStore.questionList.filter(item => {
    return !item.isDelete;
  });
});

const updateQuestion = (newQuestionItem: QuestionItem) => {
  useQuestionListStore.updateQuestion(newQuestionItem);
};
</script>

<template>
  <div class="ListQuestion">
    <PageTitle title="我的问卷" font-size="30px">
      <el-button type="primary">创建问卷</el-button>
    </PageTitle>
    <div class="question-list">
      <QuestionCardItem
        v-for="item in questionList"
        :key="item.id"
        :question-item="item"
        @update-question="updateQuestion"
      ></QuestionCardItem>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ListQuestion {
  width: 100%;
  height: 100%;
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
