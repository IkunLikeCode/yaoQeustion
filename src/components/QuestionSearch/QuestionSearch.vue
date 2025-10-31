<script setup lang="ts">
import { ElInput } from "element-plus";
import { useQuestionSearch } from "@/hooks/useQuestionSearch";
import type { pageInfo as PageInfo } from "@/store/module/questionList";
const props = defineProps<{
  state?: "all" | "isStar" | "isDelete";
  pageInfo: PageInfo;
}>();
const { searchText, searchHandle } = useQuestionSearch({
  state: props.state,
  pageInfo: props.pageInfo
});
const handleSearch = () => {
  searchHandle();
};
</script>

<template>
  <div class="QuestionSearch">
    <ElInput v-model="searchText" placeholder="请输入搜索内容">
      <template #append>
        <div class="search-icon" @click="handleSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </template>
    </ElInput>
  </div>
</template>

<style lang="less" scoped>
.QuestionSearch {
  width: 300px;
}
.search-icon {
  cursor: pointer;
}
</style>
