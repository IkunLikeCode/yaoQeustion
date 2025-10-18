import request from "..";
import type { RegisterInfoType, LoginInfoType } from "./type";
// 用户模块

// 用户注册
export const register = (data: RegisterInfoType) => {
  return request.request({
    url: "/api/user/register",
    method: "POST",
    data
  });
};

export const login = <T>(data: LoginInfoType) => {
  return request.request<T>({
    url: "/api/user/login",
    method: "POST",
    data
  });
};

export const getUserInfo = <T>() => {
  return request.request<T>({
    url: "/api/user/profile",
    method: "GET"
  });
};
