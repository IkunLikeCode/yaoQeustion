<!-- 保存和发布按钮 -->
<script setup lang="ts">
import { ElButton, ElMessage } from "element-plus";
import { useQuestionStore } from "@/store/module/question";
import { useUserStore } from "@/store/module/user/userStore";
import { reactive } from "vue";
import { saveQuestion } from "@/api/question";
import { useRouter, useRoute } from "vue-router";
import { updateQuestion } from "@/api/question";
import { PUBLISH_MSG, PUBLISH_FAIL_MSG, SAVE_MSG, EDIT_MSG } from "@/utils/const";
const router = useRouter();
const questionStore = useQuestionStore();
const userStore = useUserStore();
const { editOrCopy, id } = useRoute().query;
async function saveQuestionHandle() {
  publishQuestion("save");
}
async function publishQuestion(saveOrPublish: string = "publish") {
  console.log(1);
  const questionInfo = reactive<any>({
    title: questionStore.questionInfo?.questionTitle || "",
    desc: questionStore.questionInfo?.questionDesc || "",
    author: userStore.userInfo?.username || "",
    isPublished: saveOrPublish === "publish" ? true : false,
    isStar: false,
    js: "",
    css: "",
    isDelete: false,
    componentsList: questionStore.componentsList || [],
    userId: userStore.userInfo?.id || "",
    textMainColor: questionStore.questionInfo?.fontColor || "#000000",
    bgMainColor: questionStore.questionInfo?.backgroundColor || "#ffffff"
  });
  // 校验组件列表
  if (!validateComponentsList(questionInfo.componentsList)) {
    return;
  }
  if (!questionInfo.title || !questionInfo.desc) {
    ElMessage.warning("请输入标题和描述");
    return;
  }
  try {
    if (editOrCopy === "edit" || saveOrPublish === "save") {
      delete questionInfo.userId;
      const result = await updateQuestion<any>(questionInfo, id as string);
      if (result.affected === 1) {
        ElMessage.success(EDIT_MSG);
        router.push({
          path: "/manage/listQuestion"
        });
      }
      return;
    }
    if (editOrCopy === "copy" || saveOrPublish === "publish") {
      const result = await saveQuestion<any>(questionInfo);
      if (result.user) {
        ElMessage.success(saveOrPublish === "publish" ? PUBLISH_MSG : SAVE_MSG);
        router.push({
          path: "/manage/listQuestion"
        });
      }
    }
  } catch (error: any) {
    ElMessage.error(error.message || PUBLISH_FAIL_MSG);
  }
}

/**
 * 校验组件列表是否符合要求统一校验在页面中组件的标题是否填写，标题是必须填写的
 * @param componentsList 组件列表
 */
function validateComponentsList(componentsList: any[]) {
  for (let i = 0; i < componentsList.length; i++) {
    const component = componentsList[i];
    if (component) {
      if (!component.props.title) {
        ElMessage.warning(`请填写第${i + 1}个组件的标题`);
        questionStore.selectedId = component.fe_id;
        return false;
      }
    }
  }
  return true;
}
</script>

<template>
  <div class="saveAndPostBtn">
    <ElButton type="default" @click="saveQuestionHandle">保存</ElButton>
    <ElButton type="primary" @click="publishQuestion('publish')">发布</ElButton>
  </div>
</template>

<style lang="less" scoped></style>
