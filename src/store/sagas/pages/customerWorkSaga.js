import { takeEvery, call, put, select } from "redux-saga/effects";

import { actions } from "../../../constant";
import { downloadFiles } from "../../../constant/func";

import axios from "axios";

import { BASE_URL } from "../../../constant/config";
const customerWorkUrl = BASE_URL + "/api/v1/projectFilesList";
const downloadWorkUrl = BASE_URL + "/api/v1/projectFiles";
const deleteWorkUrl = BASE_URL + "/api/v1/projectFiles";

export function* customerWorkSaga() {
  yield takeEvery(actions.GET_CUSTOMER_WORK, function* () {
    try {
      const token = yield select((state) => state.customerWork.token);
      const res = yield call(axios.get, customerWorkUrl, {
        headers: { Authorization: token },
      });

      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_GET_CUSTOMER_WORK,
          data: res.data.data,
        });
      } else {
        yield put({
          type: actions.FAIL_GET_CUSTOMER_WORK,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_GET_CUSTOMER_WORK,
      });
    }
  });
  yield takeEvery(actions.CUSTOMER_DOWNLOAD_WORK, function* () {
    try {
      const token = yield select((state) => state.customerWork.token);
      const projectName = yield select(
        (state) => state.customerWork.projectName
      );
      const res = yield call(
        axios.get,
        downloadWorkUrl + "?projectName=" + projectName,
        { headers: { Authorization: token }, responseType: "blob" }
      );

      if (res.status === 200) {
        downloadFiles(res.data, projectName);
      } else {
        alert(
          `下载失败\nCode：${res.status}\n如果多次尝试后无果，请尽快与我们联系~`
        );
      }
    } catch (error) {
      alert(`抱歉，下载失败\n如果多次尝试后无果，请尽快与我们联系~`);
    }
  });
  yield takeEvery(actions.CUSTOMER_DELETE_WORK, function* () {
    try {
      const token = yield select((state) => state.customerWork.token);
      const projectName = yield select(
        (state) => state.customerWork.projectName
      );
      const res = yield call(
        axios.delete,
        deleteWorkUrl + "?projectName=" + projectName,
        { headers: { Authorization: token } }
      );
      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_DELETE_WORK,
        });
        alert(`成功删除`);
      } else {
        alert(
          `删除失败\nCode：${res.status}\n如果多次尝试后无果，请尽快与我们联系~`
        );
        yield put({
          type: actions.FAIL_DELETE_WORK,
        });
      }
    } catch (error) {
      alert(`抱歉，删除失败\n如果多次尝试后无果，请尽快与我们联系~`);
      yield put({
        type: actions.FAIL_DELETE_WORK,
      });
    }
  });
}
