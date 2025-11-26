export interface RegisterInfoType {
  loginId: string;
  username?: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  nickname?: string;
}

export interface LoginInfoType {
  loginId: string;
  password: string;
}
