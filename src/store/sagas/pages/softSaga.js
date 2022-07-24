import { takeEvery } from "redux-saga/effects";

import { actions } from "../../../constant";

import { BASE_URL } from "../../../constant/config";
const raspberryUrl = BASE_URL + "/api/v1/downloadSoftware?version=raspberry";
const windowsUrl = BASE_URL + "/api/v1/downloadSoftware?version=windows";

export function* softSaga() {
  yield takeEvery(actions.GET_RASPBERRY_SOFT, function* () {
    try {
      yield window.open(raspberryUrl);
    } catch (error) {
      alert(`抱歉，下载失败\n如果多次尝试后无果，请尽快与我们联系~\n${error}`);
    }
  });
  yield takeEvery(actions.GET_WINDOWS_SOFT, function* () {
    try {
      yield window.open(windowsUrl);
    } catch (error) {
      alert(`抱歉，下载失败\n如果多次尝试后无果，请尽快与我们联系~\n${error}`);
    }
  });
}
