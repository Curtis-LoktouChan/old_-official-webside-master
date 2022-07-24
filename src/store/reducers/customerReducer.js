import { actions } from "../../constant";

export function customerReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USERINFODETAILS:
      return Object.assign({}, state, action);
    case actions.SUCCESS_GET_USERINFODETAILS:
      const { data } = action;
      return Object.assign({}, { data: data });
    case actions.FAIL_GET_USERINFODETAILS:
      return Object.assign({}, state, action);
    case actions.CHANGE_USER_INFO:
      return Object.assign({}, state, action);
    case actions.SUCCESS_CHANGE_USER_INFO:
      const { newInfo } = action;
      return Object.assign({}, { data: newInfo });
    case actions.FAIL_CHANGE_USER_INFO:
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
