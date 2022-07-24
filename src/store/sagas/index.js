import { all } from "redux-saga/effects";

import { loginSaga } from "./pages/loginSaga";
import { homeSaga } from "./pages/home/homeSaga";
import { signUpSaga } from "./pages/signUpSaga";
import { customerSaga } from "./pages/customerSaga";
import { customerWorkSaga } from "./pages/customerWorkSaga";
import { softSaga } from "./pages/softSaga";
import { examSaga } from "./pages/examSaga";
import { courseCenterSaga } from "./pages/courseCenterSaga";

export function* defSaga() {
    yield all([
        loginSaga(),
        homeSaga(),
        signUpSaga(),
        customerSaga(),
        customerWorkSaga(),
        softSaga(),
        courseCenterSaga(),
        examSaga(),
    ]);
}
