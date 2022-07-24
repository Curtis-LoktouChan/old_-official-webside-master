import { takeEvery, call, put } from "redux-saga/effects";

import { actions } from "../../../constant";

import axios from "axios";

const courseCenterFilesListUrl = "https://api.huiaistar.com/api/sectionInfo/";


export function* courseCenterSaga() {
    yield takeEvery(actions.GET_COURSE_FILES_LIST, function* () {
        try {
            // const series = yield select((state) => state.courseCenter.series);
            const res = yield call(axios.get, courseCenterFilesListUrl);
            // const res = yield call(
            //     axios.post,
            //     courseCenterFilesListUrl,
            //     JSON.stringify({ series: series })
            // );
            if (res.status === 200) {
                yield put({
                    type: actions.SUCCESS_GET_COURSE_FILES_LIST,
                    filesList: res.data,
                });
            } else {
                yield put({
                    type: actions.FAIL_GET_COURSE_FILES_LIST,
                });
            }
        } catch (error) {
            yield put({
                type: actions.FAIL_GET_CUSTOMER_WORK,
            });
        }
    });
}
