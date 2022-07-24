import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/loginReducer";
import { homeReducer } from "./reducers/homeReducers/homeReducer";
import { signUpReducer } from "./reducers/signUpReducer";
import { customerReducer } from "./reducers/customerReducer";
import { customerWorkReducer } from "./reducers/customerWorkReducer";
import { softReducer } from "./reducers/softReducer";
import { courseCenterReducer } from "./reducers/courseCenterReducer";
import { examReducer } from "./reducers/examReducer";
import { teacherClassReducer } from "./reducers/teacherClassReducer";

import createSagaMiddleware from "redux-saga";
import { defSaga } from "./sagas";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["teacherClassInfo", "user"],
};

const middleWare = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
  signUp: signUpReducer,
  customer: customerReducer,
  customerWork: customerWorkReducer,
  soft: softReducer,
  courseCenter: courseCenterReducer,
  exam: examReducer,
  teacherClassInfo: teacherClassReducer,
});

let myPersistReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(myPersistReducer, applyMiddleware(middleWare));
const persistor = persistStore(store);
export { store, persistor };
// 运行 saga
middleWare.run(defSaga);
