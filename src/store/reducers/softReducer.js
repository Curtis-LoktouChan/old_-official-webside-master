import { actions } from "../../constant";

export function softReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_RASPBERRY_SOFT:
            return Object.assign({}, state, action);
        case actions.GET_WINDOWS_SOFT:
            return Object.assign({}, state, action);
        default:
            return state;
    }
};