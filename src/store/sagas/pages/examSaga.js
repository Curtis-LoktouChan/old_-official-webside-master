import { takeEvery, select, put, call } from "redux-saga/effects";
import { actions } from "../../../constant";

import axios from "axios";

const examUrl = "https://api.huiaistar.com/api/questionList/";
const answerListUrl = "https://api.huiaistar.com/api/answerList/";

export function* examSaga() {
    yield takeEvery(actions.GET_EXAM, function* () {
        try {
            const token = yield select((state) => state.user.token);
            const res = yield call(
                axios.get,
                examUrl + window.location.search,
                { headers: { Authorization: token } }
            );

            if (res.status === 200) {
                yield put({
                    type: actions.SUCCESS_GET_EXAM,
                    questionList: res.data,
                });
            } else {
                console.log("未知error");
            }
        } catch (error) {
            console.log(error);
        }
    });

    yield takeEvery(actions.SUBMIT_EXAM, function* () {
        try {
            const token = localStorage.getItem("token");
            const submitExam = yield select((state) => state.exam.data);

            let requestParam = [];
            requestParam.push(submitExam);
            requestParam.push({
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            console.log(...requestParam)
            const res = yield call(axios.post, answerListUrl, ...requestParam);

            if (res.status === 200) {
                alert("你的得分是：" + res.data[0].totalPoint + "分");
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    });
}
