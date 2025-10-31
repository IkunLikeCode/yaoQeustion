<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { ElTable, ElTableColumn, ElPagination, ElCard, ElMessage, ElMessageBox } from "element-plus";
import { useGetQuestionList } from "@/hooks/useGetQuestionList";
import { useQuestionList } from "@/store/module/questionList";
import { formatDate } from "@/utils/formatDate";
import { updateQuestion as updateQuestionApi, deleteQuestion as deleteQuestionApi } from "@/api/question";
import { useRequest } from "@/hooks/useRequest";
import { computed, shallowRef, watch } from "vue";
import NotData from "@/components/NotData/NotData.vue";
import type { QuestionItem } from "../List/type";

const questionListStore = useQuestionList();
const questionList = computed(() => questionListStore.deleteQuestionList.filter(item => item.isDelete));

const { changePage, pageInfo, updateQuestion } = useGetQuestionList({ state: "isDelete" });
const currentIndex = shallowRef(-1);
const deleteQuestionIds = shallowRef<string[]>([]);
// 恢复问卷
const { isLoading, callBack: restoreQuestion } = useRequest(async (row: QuestionItem) => {
  const newQuestionItem = {
    ...row,
    isDelete: false
  };
  currentIndex.value = questionList.value.indexOf(row);
  await updateQuestionApi(newQuestionItem, row.id);
  updateQuestion(newQuestionItem);
  ElMessage.success("恢复成功");
});

// 删除问卷
const { isLoading: deleteLoading, callBack: deleteQuestion } = useRequest(async (row: QuestionItem) => {
  currentIndex.value = questionList.value.indexOf(row);
  deleteQuestionIds.value.push(row.id);
  await deleteFn();
});

// 批量删除问卷
const { isLoading: allDeleteLoading, callBack: allDeleteQuestion } = useRequest(async () => {
  ElMessageBox.alert("您确定要删除选中的问卷吗?", "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    await deleteFn();
  });
});

async function deleteFn() {
  try {
    await deleteQuestionApi(deleteQuestionIds.value);
    // 保存一份要删除的ID
    const idsToDelete = [...deleteQuestionIds.value];
    // 过滤掉要删除的问卷
    questionListStore.deleteQuestionList = questionListStore.deleteQuestionList.filter(
      item => !idsToDelete.includes(item.id)
    );
    // 清空选中的ID
    deleteQuestionIds.value = [];
    ElMessage.success("删除成功");
  } catch (error: any) {
    ElMessage.error(error.message || "删除失败");
  }
}

// 处理选择变化
const handleSelectionChange = (val: QuestionItem[]) => {
  deleteQuestionIds.value = val.map(item => item.id);
};

watch(
  () => questionListStore.deleteQuestionList.length,
  () => {
    if (questionListStore.deleteQuestionList.length === 0) {
      changePage(1);
    }
  }
);
</script>

<template>
  <div class="RecycleBin">
    <PageTitle title="回收站" font-size="30px"> </PageTitle>
    <template v-if="questionList.length > 0">
      <el-card class="table-container">
        <el-button
          :disabled="deleteQuestionIds.length === 0"
          type="danger"
          :loading="allDeleteLoading"
          @click="allDeleteQuestion(questionList)"
          >批量删除</el-button
        >
        <el-table :data="questionList" class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="问卷标题" prop="title"></el-table-column>
          <el-table-column label="创建时间" prop="createdAt">
            <template #default="{ row }">
              {{ formatDate(row.createdAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                :loading="isLoading && currentIndex === $index"
                @click="restoreQuestion(row)"
                >恢复</el-button
              >
              <el-popconfirm title="确认删除吗？" @confirm="deleteQuestion(row)">
                <template #reference>
                  <el-button type="danger" size="small" :loading="deleteLoading && currentIndex === $index"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="questionListStore.total"
            @change="changePage"
          />
        </div>
      </el-card>
    </template>
    <template v-else>
      <NotData></NotData>
    </template>
  </div>
</template>

<style lang="less" scoped>
.RecycleBin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  .table-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .table {
    width: 100%;
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
