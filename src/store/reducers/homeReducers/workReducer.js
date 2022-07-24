import { actions } from "../../../constant";
export function workReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_WORK:
            return Object.assign({}, state, action);
        case actions.SUCCESS_GET_WORK:
            const { data } = action;
            return Object.assign({}, {data: [...data]});
        case actions.FAIL_GET_WORK:
            return Object.assign({}, state, action);
        case actions.RESET_WORK:
            return {};
        default:
            return state;
    }
};