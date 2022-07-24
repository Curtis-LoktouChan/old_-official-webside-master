import { combineReducers } from "redux";
import { courseReducer } from "./courseReducer";
import { workReducer } from "./workReducer";

export const homeReducer = combineReducers({
    course: courseReducer,
    work: workReducer
});
