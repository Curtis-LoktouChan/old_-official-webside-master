import { takeEvery, call, put, select } from "redux-saga/effects";

import { actions } from "../../../constant";
import { message } from "antd";
import axios from "axios";

import { BASE_URL } from "../../../constant/config";
const reqURL = BASE_URL + "/api/v1/base/getUserInfo";
const reqURL2 = BASE_URL + "/api/v1/base/updateUserInfo";

export function* customerSaga() {
  yield takeEvery(actions.GET_USERINFODETAILS, function* () {
    try {
      const token = yield select((state) => state.customer.token);

      const res = yield call(axios.get, reqURL, {
        headers: { Authorization: token },
      });

      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_GET_USERINFODETAILS,
          data: res.data.data,
        });
      } else {
        yield put({
          type: actions.FAIL_GET_USERINFODETAILS,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_GET_USERINFODETAILS,
      });
    }
  });

  // 暂时没有实现修改信息接口
  yield takeEvery(actions.CHANGE_USER_INFO, function* () {
    try {
      const token = yield select((state) => state.customer.data.token);
      const newdata = yield select((state) => state.customer.data);
      const user = yield select((state) => state.user);

      const res = yield call(axios.post, reqURL2, newdata, {
        headers: { Authorization: token },
      });

      if (res.status === 200) {
        message.info(res.data.msg);
        yield put({
          type: actions.SUCCESS_CHANGE_USER_INFO,
          newInfo: newdata,
        });
        yield put({
          type: actions.SUCCESS_LOGIN,
          username: newdata.username,
          roleId: user.roleId,
          status: user.status,
        });
      } else {
        yield put({
          type: actions.FAIL_CHANGE_USER_INFO,
        });
      }
    } catch (error) {
      message.warning(error.response.data.msg);
      yield put({
        type: actions.FAIL_CHANGE_USER_INFO,
      });
    }
  });
}
