import { actions, userLoginStatus, eventName } from "../../constant";
import PubSub from "pubsub-js";

export function userReducer(state = {}, action) {
  switch (action.type) {
    case actions.LOGIN:
      // 传递给 saga
      return Object.assign({}, state, action);
    case actions.LOGIN_WITH_TOKEN:
      return Object.assign({}, state, action);
    case actions.SUCCESS_LOGIN:
      PubSub.publish(eventName.SUCCESS_LOGIN, {
        status: userLoginStatus.SUCCEED,
      });
      const { token, username, roleId } = action;
      // 保存 token 到本地
      if (token) {
        localStorage.setItem("token", token);
      }
      return {
        username: username,
        roleId: roleId,
        status: userLoginStatus.SUCCEED,
        token: token,
      };
    case actions.FAIL_LOGIN:
      PubSub.publish(eventName.FAIL_LOGIN, { status: userLoginStatus.FAILED });
      const { errorMessage } = action;
      return {
        status: userLoginStatus.FAILED,
        errorMessage: errorMessage,
      };
    case actions.SIGN_OUT:
      PubSub.publish(eventName.FAIL_LOGIN);
      // 清除本地 token
      localStorage.removeItem("token");

      return {
        status: undefined, // 防止下次发送登录请求时出现错误提示
        errorMessage: "",
      };
    default:
      return state;
  }
}
