exports.actions = {
  // 主页 action
  LOGIN_WITH_TOKEN: "login_with_token",
  SIGN_OUT: "sign_out",
  // 获取课程列表
  GET_COURSE: "get_course",
  SUCCESS_GET_COURSE: "success_get_course",
  FAIL_GET_COURSE: "fail_get_course",
  // 获取作品列表
  GET_WORK: "get_work",
  SUCCESS_GET_WORK: "success_get_work",
  FAIL_GET_WORK: "fail_get_work",
  RESET_WORK: "reset_work",

  // 登录页 action
  LOGIN: "action_login",
  SUCCESS_LOGIN: "success_login",
  FAIL_LOGIN: "fail_login",

  // 注册页 action
  SEND_CAPTCHA_MESSAGE: "send_captcha_message",
  SUCCESS_SEND_CAPTCHA_MESSAGE: "success_send_captcha_message",
  FAIL_SEND_CAPTCHA_MESSAGE: "fail_send_captcha_message",

  SEND_SIGN_UP_MESSAGE: "send_sign_up_message",
  SUCCESS_SIGN_UP: "success_sign_up",
  FAIL_SIGN_UP: "fail_sign_up",

  // 用户中心页
  GET_USERINFODETAILS: "get_user_info_details",
  SUCCESS_GET_USERINFODETAILS: "success_get_user_info_details",
  FAIL_GET_USERINFODETAILS: "fail_get_user_info_details",
  CHANGE_USER_INFO: "change_user_info",
  SUCCESS_CHANGE_USER_INFO: "success_change_user_info",
  FAIL_CHANGE_USER_INFO: "fail_change_user_info",

  // 用户作品页
  GET_CUSTOMER_WORK: "get_customer_work",
  SUCCESS_GET_CUSTOMER_WORK: "success_get_customer_work",
  FAIL_GET_CUSTOMER_WORK: "fail_get_customer_work",
  CUSTOMER_DOWNLOAD_WORK: "customer_download_work",
  CUSTOMER_DELETE_WORK: "customer_delete_work",
  SUCCESS_DELETE_WORK: "success_delete_work",
  FAIL_DELETE_WORK: "fail_delete_work",

  // 软件下载页
  GET_RASPBERRY_SOFT: "get_raspberry_soft",
  GET_WINDOWS_SOFT: "get_windows_soft",

  // 课程中心页
  GET_COURSE_FILES_LIST: "get_course_files_list",
  GET_COURSE_FILES_CONTENT: "get_course_files_content",
  SUCCESS_GET_COURSE_FILES_LIST: "success_get_course_files_list",
  FAIL_GET_COURSE_FILES_LIST: "fail_get_course_files_list",
  // 试题部分
  GET_EXAM: "get_exam",
  SUCCESS_GET_EXAM: "success_get_exam",
  UPDATE_ANSWER: "update_answer",
  SUBMIT_EXAM: "submit_exam",

  // 保存点击的班级ID
  SAVE_CLASSINFO: "save_classInfo",
};
exports.TOKEN = "";

exports.userLoginStatus = {
  SUCCEED: true,
  FAILED: false,
};

exports.userChangeStatus = {
  SUCCEED: true,
  FAILED: false,
};

// 事件对象列表
exports.eventName = {
  SUCCESS_LOGIN: "success_login",
  FAIL_LOGIN: "fail_login",
};
