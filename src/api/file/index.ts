// 文件上传
import request from "../index";

// 上传文件
export const uploadFile = <T>(formData: FormData) => {
  return request.request<T>({
    url: "/api/file/upload",
    method: "post",
    data: formData
  });
};
