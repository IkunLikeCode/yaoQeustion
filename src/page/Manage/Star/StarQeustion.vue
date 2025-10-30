<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { useQuestionList } from "@/store/module/questionList";
import { computed } from "vue";
const questionListStore = useQuestionList();

const starQuestionList = computed(() => {
  return questionListStore.questionList.filter(item => {
    return item.isStar;
  });
});
</script>

<template>
  <div class="StarQeustion">
    <PageTitle title="标星问卷" font-size="30px"></PageTitle>
    <div class="question-list">
      <QuestionCardItem
        v-for="questionItem in starQuestionList"
        :key="questionItem.id"
        :question-item="questionItem"
      ></QuestionCardItem>
    </div>
  </div>
</template>

<style lang="less" scoped>
.question-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
}
</style>
