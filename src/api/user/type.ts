export interface RegisterInfoType {
  loginId: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginInfoType {
  loginId: string;
  password: string;
}
