import { takeEvery, call, put, select } from "redux-saga/effects";

import { actions } from "../../../../constant";

import axios from "axios";

import { BASE_URL } from "../../../../constant/config";
const workUrl = BASE_URL + "/api/v1/projectFilesList";

export function* workSaga() {
  yield takeEvery(actions.GET_WORK, function* () {
    try {
      const token = yield select((state) => state.home.work.token);
      const res = yield call(axios.get, workUrl, {
        headers: { Authorization: token },
      });
      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_GET_WORK,
          data: res.data.data.workList, // 数据结构
        });
      } else {
        yield put({
          type: actions.FAIL_GET_WORK,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_GET_WORK,
      });
    }
  });
}
