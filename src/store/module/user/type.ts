export interface LoginSuccessType {
  success: boolean;
  msg: string;
  token: string;
}
export interface UserInfoType {
  data: {
    username: string;
    id: string;
    avatar: string;
    nickname: string;
    iat: number;
    exp: number;
  };
  success: boolean;
}
