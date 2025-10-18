export function usernameValidate(_rule: any, value: string, callback: any) {
  // 不能包含特殊字符 比如< > 可以包含中文
  const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (!usernameRegex.test(value)) {
    callback(new Error("用户名不能包含特殊字符"));
  } else {
    callback();
  }
}

export function loginIdValidate(_rule: any, value: string, callback: any) {
  const str = String(value || "").trim();
  if (!str || str.length < 6 || str.length > 12) {
    callback(new Error("账号长度必须在6到12位之间"));
  } else {
    callback();
  }
}
