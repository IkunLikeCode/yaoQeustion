import request from "..";

/**
 * 保存question
 * @param questionInfo
 */
export function saveQuestion<T>(questionInfo: Record<string, any>) {
  return request.request<T>({
    url: "/api/question",
    method: "post",
    data: questionInfo
  });
}

/**
 * 根据用户id获取自身的问卷列表
 * @param userId 用户 ID
 * @param page 页码
 * @param pageSize 每页数量
 * @returns 问卷列表
 */
export function getQuestionListByUserId<T>({
  userId,
  page,
  pageSize,
  state = "all",
  searchText = ""
}: {
  userId?: string;
  page: number;
  pageSize: number;
  state?: "all" | "isStar" | "isDelete";
  searchText: string;
}) {
  return request.request<T>({
    url: "/api/question",
    method: "get",
    params: {
      userId,
      page,
      pageSize,
      state,
      searchText
    }
  });
}

/**
 * 更新问卷
 * @param questionInfo 问卷信息
 * @param questionId 问卷 ID
 */
export function updateQuestion<T>(questionInfo: Record<string, any>, questionId: string) {
  return request.request<T>({
    url: `/api/question/${questionId}`,
    method: "put",
    data: questionInfo
  });
}

/**
 * 彻底删除一个问卷
 * @param questionId 问卷 ID
 */
export function deleteQuestion<T>(questionIds: string[]) {
  return request.request<T>({
    url: `/api/question/batch`,
    method: "delete",
    data: {
      questionIds
    }
  });
}

/**
 * 获取问卷详情
 * @param questionId 问卷 ID
 */
export function getQuestionDetail<T>(questionId: string) {
  return request.request<T>({
    url: `/api/question/${questionId}`,
    method: "get"
  });
}
