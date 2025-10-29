// 文件返回的数据类型
export interface FileItem {
  fileName: string;
  fileSize: number;
  fileUrl: string;
  id: number;
  user: { id: string };
}
