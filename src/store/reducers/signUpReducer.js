import { actions } from "../../constant";

export function signUpReducer(state = {}, action) {
    switch (action.type) {
        case actions.SEND_CAPTCHA_MESSAGE:
            const { data } = action;
            return Object.assign({}, {phone: data});
        case actions.SUCCESS_SEND_CAPTCHA_MESSAGE:
            return Object.assign({}, {sendCaptchaStatus: true});
        case actions.FAIL_SEND_CAPTCHA_MESSAGE:
            return Object.assign({}, {sendCaptchaStatus: false});
        case actions.SEND_SIGN_UP_MESSAGE:
            const { info } = action;
            return Object.assign({}, {info: info});
        case actions.SUCCESS_SIGN_UP:
            return Object.assign({}, {signUpStatus: true});
        case actions.FAIL_SIGN_UP:
            const { errorMessage } = action;
            return Object.assign({}, {signUpStatus: false, errorMessage: errorMessage});
        default:
            return state;
    }
};