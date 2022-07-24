import { takeEvery, call, put } from "redux-saga/effects";

import { actions } from "../../../../constant";

import axios from "axios";

export function* courseSaga() {
  yield takeEvery(actions.GET_COURSE, function* () {
    try {
      const url = "https://api.huiaistar.com/api/homePageCourseDisplay/";
      const res = yield call(axios.get, url);
      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_GET_COURSE,
          data: [res.data],
        });
      } else {
        yield put({
          type: actions.FAIL_GET_COURSE,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_GET_COURSE,
      });
    }
  });
}
