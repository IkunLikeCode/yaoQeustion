<script setup lang="ts">
import { ElCard, ElMessage, ElTag, ElPopconfirm, ElButton } from "element-plus";
import type { QuestionItem } from "@/page/Manage/List/type";
import { updateQuestion } from "@/api/question";
import { useRequest } from "@/hooks/useRequest";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { formatDate } from "@/utils/fromatDate";
import { EDIT_OR_COPY, COPY_OR_EDIT } from "@/utils/const";
const router = useRouter();
const emit = defineEmits(["updateQuestion"]);
const props = defineProps<{
  questionItem: QuestionItem;
}>();
const currentQuestionId = ref("");

// 标星
const { isLoading, callBack } = useRequest(
  async () => {
    const newQuestionItem = {
      ...props.questionItem,
      isStar: !props.questionItem.isStar
    };
    currentQuestionId.value = props.questionItem.id;
    try {
      await updateQuestion(newQuestionItem, props.questionItem.id);
      emit("updateQuestion", newQuestionItem);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.questionItem.isStar ? ElMessage.warning("取消标星") : ElMessage.success("标星");
    } catch (error: any) {
      ElMessage.error(error.message || "取消标星失败");
    }
  },
  {
    debounceDelay: 500,
    isDebounce: true
  }
);

// 假删除 第一次删除会到回收站
const deleteQuestionHandle = async () => {
  try {
    await updateQuestion(
      {
        ...props.questionItem,
        isDelete: true
      },
      props.questionItem.id
    );
    ElMessage.success("删除成功");
    emit("updateQuestion", {
      ...props.questionItem,
      isDelete: true
    });
  } catch (error: any) {
    ElMessage.error(error.message || "删除失败");
  }
};

// 编辑问卷
const editQuestion = () => {
  router.push({
    path: "/question/edit",
    query: {
      id: props.questionItem.id,
      editOrCopy: EDIT_OR_COPY
    }
  });
};

// 复制问卷
const copyQuestion = () => {
  router.push({
    path: "/question/edit",
    query: {
      id: props.questionItem.id,
      editOrCopy: COPY_OR_EDIT
    }
  });
};
const isCurrent = computed(() => {
  return currentQuestionId.value === props.questionItem.id;
});
</script>

<template>
  <div class="QuestionCardItem">
    <el-card class="card">
      <template #header>
        <div class="container">
          <div class="top">
            <div class="title">
              <i v-if="questionItem.isStar" class="iconfont title-icon icon-biaoxing"></i>
              <span class="title-text">{{ questionItem.title }}</span>
            </div>
            <div class="time">
              <div class="is-active">
                <el-tag :type="questionItem.isPublished ? 'success' : 'info'">{{
                  questionItem.isPublished ? "已发布" : "未发布"
                }}</el-tag>
              </div>
              <div class="time-text">{{ formatDate(questionItem.createdAt) }}</div>
            </div>
          </div>
          <div class="content">
            <div class="description">{{ questionItem.desc }}</div>
          </div>
        </div>
      </template>
      <div class="options">
        <div class="editAndStar">
          <el-button link @click="editQuestion">
            <div class="btn">
              <i class="iconfont icon-bianji"></i>
              <span>编辑问卷</span>
            </div>
          </el-button>
          <el-button link :disabled="!questionItem.isPublished">
            <div class="btn">
              <i class="iconfont icon-tongji"></i>
              <span>统计问卷</span>
            </div>
          </el-button>
        </div>
        <div class="other">
          <el-button link :loading="isLoading && isCurrent" @click="callBack">
            <div class="btn">
              <i class="iconfont icon-biaoxing"></i>
              <span>{{ questionItem.isStar ? "取消标星" : "标星" }}</span>
            </div>
          </el-button>
          <el-button link @click="copyQuestion">
            <div class="btn">
              <i class="iconfont icon-fuzhi"></i>
              <span>复制</span>
            </div>
          </el-button>
          <el-popconfirm title="确认删除吗？" @confirm="deleteQuestionHandle">
            <template #reference>
              <el-button link>
                <div class="btn">
                  <i class="iconfont icon-top"></i>
                  <span>删除</span>
                </div>
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.QuestionCardItem {
  .card {
    .container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: bold;
      color: var(--main-color);
      .title-icon {
        color: rgb(253, 74, 74);
      }
    }
    .time {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
    }
    .options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .other {
        display: flex;
        gap: 30px;
      }
      .btn {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
