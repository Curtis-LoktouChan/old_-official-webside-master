import { takeEvery, select, put, call } from "redux-saga/effects";
import { actions } from "../../../constant";

import axios from "axios";

import { BASE_URL } from "../../../constant/config";
const sendFormUrl = BASE_URL + "/api/v1/base/register";
export function* signUpSaga() {
  // yield takeEvery(actions.SEND_CAPTCHA_MESSAGE, function*() {
  //     try {
  //         // const phone = yield select(state => state.signUp.phone);
  //         // 发送网络请求，response 数据格式为json
  //         // const res = yield call(axios.post, reqURL, JSON.stringify({phone: phone}));
  //         // json-server
  //         const res = yield call(axios.get, reqURL);

  //         if(res.status === 200) {
  //             yield put({
  //                 type: actions.SUCCESS_SEND_CAPTCHA_MESSAGE,
  //             });
  //         } else {
  //             yield put({
  //                 type: actions.FAIL_SEND_CAPTCHA_MESSAGE
  //             });
  //         }
  //     } catch (error) {
  //         yield put({
  //             type: actions.FAIL_SEND_CAPTCHA_MESSAGE
  //         });
  //     }
  // });
  yield takeEvery(actions.SEND_SIGN_UP_MESSAGE, function* () {
    try {
      const info = yield select((state) => state.signUp.info);
      if (info.agreement || info.confirm) {
        delete info.agreement;
        delete info.confirm;
      }
      // 发送网络请求，response 数据格式为json
      const res = yield call(axios.post, sendFormUrl, JSON.stringify(info));
      if (res.status === 200) {
        yield put({
          type: actions.SUCCESS_SIGN_UP,
        });
      } else {
        yield put({
          type: actions.FAIL_SIGN_UP,
          errorMessage:
            "抱歉，不明确的错误原因，请通过页面下方联系方式联系我们~",
        });
      }
    } catch (error) {
      yield put({
        type: actions.FAIL_SIGN_UP,
        errorMessage: error.response.data,
      });
    }
  });
}
