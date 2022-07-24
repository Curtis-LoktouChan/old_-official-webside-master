import { actions } from "../../constant";

export function customerWorkReducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_CUSTOMER_WORK:
            return Object.assign({}, state, action);
        case actions.SUCCESS_GET_CUSTOMER_WORK:
            const { workTotal, workList } = action.data;
            return Object.assign({}, {total: workTotal, workList: workList});
        case actions.FAIL_GET_CUSTOMER_WORK:
            return Object.assign({}, state, action);
        case actions.CUSTOMER_DOWNLOAD_WORK:
            return Object.assign({}, state, action);
        case actions.CUSTOMER_DELETE_WORK:
            return Object.assign({}, state, action, {isDelete: false});
        case actions.SUCCESS_DELETE_WORK:
            return Object.assign({}, state, action, {isDelete: true});
        case actions.FAIL_DELETE_WORK:
            return Object.assign({}, state, action, {isDelete: false});
        default:
            return state;
    }
};