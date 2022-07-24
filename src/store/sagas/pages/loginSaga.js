import { takeEvery, select, put, call } from "redux-saga/effects";
import { actions } from "../../../constant";

import axios from "axios";

import { BASE_URL } from "../../../constant/config";
const sendFormUrl = BASE_URL + "/api/v1/base/login";

export function* loginSaga() {
  yield takeEvery(actions.LOGIN, function* () {
    try {
      const userInfo = yield select((state) => state.user.data);
      // 发送网络请求，response 数据格式为json
      const res = yield call(
        axios.post,
        sendFormUrl,
        JSON.stringify({ ...userInfo })
      );

      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_LOGIN,
          token: res.data.data.token,
          username: res.data.data.username,
          roleId: res.data.data.roleId,
        });
      } else {
        yield put({
          type: actions.FAIL_LOGIN,
          errorMessage:
            "抱歉，不明确的错误原因，请通过页面下方联系方式联系我们~",
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_LOGIN,
        errorMessage: error.response.data,
      });
    }
  });
}
