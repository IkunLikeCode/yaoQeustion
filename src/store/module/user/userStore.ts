import { defineStore } from "pinia";
import { getUserInfo, login, register } from "@/api/user";
import type { LoginInfoType, RegisterInfoType } from "@/api/user/type";
import { setLocalStorage } from "@/utils/localStoreage";
import type { LoginSuccessType, UserInfoType } from "./type";
interface userStoreState {
  isLogin: boolean;
  userInfo: {
    id: string;
    avatar: string;
    nickname: string;
    username: string;
  };
}

export const useUserStore = defineStore("user", {
  state: (): userStoreState => ({
    isLogin: false,
    userInfo: {
      id: "",
      avatar: "",
      nickname: "",
      username: ""
    }
  }),
  actions: {
    // 用户注册
    async userRegister(data: RegisterInfoType) {
      try {
        // 移除 confirmPassword 字段，只发送后端需要的字段
        const { confirmPassword, ...registerData } = data;
        await register({
          ...registerData,
          confirmPassword: confirmPassword || ""
        });
      } catch (error: any) {
        console.log(error.message);
        throw error; // 重新抛出错误，让组件能够捕获
      }
    },
    // 用户登录
    async userLogin(data: LoginInfoType) {
      try {
        const res = await login<LoginSuccessType>(data);
        setLocalStorage("questionToken", res.token);
        this.isLogin = true;
        // 登录成功后获取用户信息
        await this.getUserInfo();
      } catch (error: any) {
        console.log(error.message);
        throw error; // 重新抛出错误，让组件能够捕获
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const { data: userInfo } = await getUserInfo<UserInfoType>();
        console.log(userInfo);
        this.userInfo = {
          id: userInfo.id,
          avatar: userInfo.avatar,
          nickname: userInfo.nickname,
          username: userInfo.username
        };
      } catch (error: any) {
        console.log(error.message);
        throw error; // 重新抛出错误，让组件能够捕获
      }
    }
  }
});
