import Cookies, { defaults } from "js-cookie";

/*
 * @param {Object} info:{username, email, appkey, role}
 * 设置cookie
 */
export function setCookie(info) {
  /* 通过遍历 || 如果你确定里面的属性名就可以一个一个写 */
  const arr = Object.entries(
    info
  ); /* 把每一项变成一个长度为2的数组，0：key 1：value */
  for (let prop in arr) {
    Cookies.set(arr[prop][0], arr[prop][1]);
  }
  return true;
}
/* 获取用户的cookie */
export function getUserCookie() {
  return {
    username: Cookies.get("username"),
    appkey: Cookies.get("appkey"),
    email: Cookies.get("email"),
    role: Cookies.get("role")
  };
}
/* 移除Cookie */
export function removeUserCookie() {
  Cookies.remove("username");
  Cookies.remove("appkey");
  Cookies.remove("role");
  Cookies.remove("email");
  return true;
}
