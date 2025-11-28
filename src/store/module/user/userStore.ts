import { defineStore } from "pinia";
import { getUserInfo, login, register } from "@/api/user";
import type { LoginInfoType, RegisterInfoType } from "@/api/user/type";
import { setLocalStorage } from "@/utils/localStoreage";
import type { LoginSuccessType, UserInfoType } from "./type";
import { ElMessage } from "element-plus";
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
        ElMessage.error(error.message || "注册失败");
        throw error; // 重新抛出错误，让组件能够捕获
      }
    },
    // 用户登录
    async userLogin(data: LoginInfoType) {
      try {
        const res = await login<LoginSuccessType>(data);
        setLocalStorage("questionToken", res.token);
        // 登录成功后获取用户信息
        await this.getUserInfo();
      } catch (error: any) {
        ElMessage.error(error.message || "登录失败");
        throw error; // 重新抛出错误，让组件能够捕获
      }
    },
    // 获取用户信息
    async getUserInfo() {
      // eslint-disable-next-line no-useless-catch
      try {
        const { data: userInfo } = await getUserInfo<UserInfoType>();
        this.userInfo = {
          id: userInfo.id,
          avatar: userInfo.avatar,
          nickname: userInfo.nickname,
          username: userInfo.username
        };
        this.isLogin = true;
      } catch (error: any) {
        throw error; // 重新抛出错误，让组件能够捕获
      }
    }
  }
});
