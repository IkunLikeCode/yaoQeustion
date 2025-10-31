<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { useQuestionList } from "@/store/module/questionList";
import { computed } from "vue";
import QuestionCardItem from "@/components/QuestionCardItem/QuestionCardItem.vue";
import { useGetQuestionList } from "@/hooks/useGetQuestionList";
import NotData from "@/components/NotData/NotData.vue";
import QuestionSearch from "@/components/QuestionSearch/QuestionSearch.vue";
const questionListStore = useQuestionList();

// 获取标星问卷列表 且过滤掉已删除的问卷
const starQuestionList = computed(() => {
  return questionListStore.starQuestionList.filter(item => !item.isDelete && item.isStar);
});

const { changePage, pageInfo, updateQuestion } = useGetQuestionList({ state: "isStar" });
</script>

<template>
  <div class="StarQeustion">
    <PageTitle title="标星问卷" font-size="30px">
      <QuestionSearch state="isStar" :page-info="pageInfo"></QuestionSearch>
    </PageTitle>
    <div class="question-list">
      <template v-if="starQuestionList.length > 0">
        <QuestionCardItem
          v-for="questionItem in starQuestionList"
          :key="questionItem.id"
          :question-item="questionItem"
          @update-question="updateQuestion"
        ></QuestionCardItem>
      </template>
      <template v-else>
        <NotData></NotData>
      </template>
    </div>
    <div class="pagination">
      <template v-if="starQuestionList.length > 0">
        <div class="pagination">
          <el-pagination
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="starQuestionList.length"
            @change="changePage"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.StarQeustion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.question-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
