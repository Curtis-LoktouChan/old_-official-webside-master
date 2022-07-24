import { actions } from "../../constant";

export function courseCenterReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_COURSE_FILES_LIST:
            return Object.assign({}, state, action);
        case actions.SUCCESS_GET_COURSE_FILES_LIST:
            const { filesList } = action;
            return Object.assign({}, { filesList: [...filesList] });
        case actions.FAIL_GET_COURSE_FILES_LIST:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}
