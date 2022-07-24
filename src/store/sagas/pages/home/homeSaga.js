import { all } from "redux-saga/effects";

import { headerSaga } from "./headerSaga";
import { courseSaga } from "./courseSaga";
import { workSaga } from "./workSaga";

export function* homeSaga() {
    yield all([headerSaga(), courseSaga(), workSaga()]);
}
