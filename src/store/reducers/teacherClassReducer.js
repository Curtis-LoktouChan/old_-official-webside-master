import { actions } from "../../constant";

export function teacherClassReducer(state = {}, action) {
  switch (action.type) {
    case actions.SAVE_CLASSINFO:
      return Object.assign({}, state, action);

    default:
      return state;
  }
}
