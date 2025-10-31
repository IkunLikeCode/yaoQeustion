<script setup lang="ts">
import QuestionCardItem from "@/components/QuestionCardItem/QuestionCardItem.vue";
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { useQuestionList } from "@/store/module/questionList";
import { computed } from "vue";
import { ElPagination } from "element-plus";
import { useGetQuestionList } from "@/hooks/useGetQuestionList";
import NotData from "@/components/NotData/NotData.vue";
import QuestionSearch from "@/components/QuestionSearch/QuestionSearch.vue";

const useQuestionListStore = useQuestionList();

const questionList = computed(() => {
  return useQuestionListStore.questionList.filter(item => {
    return !item.isDelete;
  });
});

const { changePage, pageInfo, updateQuestion } = useGetQuestionList({
  state: "all"
});
</script>

<template>
  <div class="ListQuestion">
    <PageTitle title="我的问卷" font-size="30px">
      <QuestionSearch state="all" :page-info="pageInfo"></QuestionSearch>
    </PageTitle>
    <div class="question-list">
      <template v-if="questionList.length > 0">
        <QuestionCardItem
          v-for="item in questionList"
          :key="item.id"
          :question-item="item"
          @update-question="updateQuestion"
        ></QuestionCardItem>
      </template>
      <template v-else>
        <NotData></NotData>
      </template>
    </div>
    <div class="el-pagination">
      <template v-if="questionList.length > 0">
        <el-pagination
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
          background
          layout="prev, pager, next, jumper"
          :total="useQuestionListStore.total"
          @change="changePage"
        />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ListQuestion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
