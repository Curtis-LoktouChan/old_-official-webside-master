import { actions } from "../../../constant";

export function courseReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_COURSE:
            return Object.assign({}, state, action);
        case actions.SUCCESS_GET_COURSE:
            const { data } = action;
            return Object.assign({}, { data: [...data] });
        case actions.FAIL_GET_COURSE:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}
