import { actions } from "../../constant";

export function examReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_EXAM:
            return Object.assign({}, state, action);
        case actions.SUCCESS_GET_EXAM:
            return Object.assign({}, state, action);
        case actions.UPDATE_ANSWER:
            let newState = Object.assign({}, state);
            if (!state.data) {
                newState = Object.assign({}, state, action);
                return newState;
            }

            let Len = newState.data.filter((item, index) => {
                if (
                    item.id === action.data[0].id &&
                    item.type === action.data[0].type
                ) {
                    newState.data[index] = action.data[0];
                    return false;
                } else {
                    return true;
                }
            });
            if (Len.length === newState.data.length) {
                newState.data.push(action.data[0]);
            }
            return newState;

        default:
            return state;
    }
}
