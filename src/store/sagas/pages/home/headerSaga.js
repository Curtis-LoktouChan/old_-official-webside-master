import { takeEvery, select, put, call } from "redux-saga/effects";
import { actions } from "../../../../constant";

import axios from "axios";
import { BASE_URL } from "../../../../constant/config";

const reqURL = BASE_URL + "/api/v1/base/tokenLogin";

export function* headerSaga() {
  yield takeEvery(actions.LOGIN_WITH_TOKEN, function* () {
    try {
      const token = yield select((state) => state.user.token);
      const res = yield call(axios.get, reqURL, {
        headers: { Authorization: token },
      });
      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_LOGIN,
          username: res.data.data.username,
          roleId: res.data.data.roleId,
        });
      } else {
        yield put({
          type: actions.FAIL_LOGIN,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_LOGIN,
      });
    }
  });
}
