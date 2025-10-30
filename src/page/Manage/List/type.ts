export interface QuestionItem {
  createdAt: string;
  desc: string;
  id: string;
  isDelete: boolean;
  isPublished: boolean;
  isStar: boolean;
  title: string;
  user: {
    id: string;
    nickname: string;
    username: string;
  };
}
