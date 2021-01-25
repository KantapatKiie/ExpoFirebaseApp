const { REACT_NATIVE_APP_URL_API, REACT_NATIVE_APP_DELAY_SEARCH } = process.env;

export const DELAY_SEARCH = REACT_NATIVE_APP_DELAY_SEARCH;

// const { REACT_NATIVE_APP_AUTH_API } = "http://wangdek.am2bmarketing.co.th/api/v1"
const REACT_NATIVE_APP_API = "http://10.0.1.37:8080/api/v1";

export const API_URL = {
  //Authenticate
  REGISTER_API: REACT_NATIVE_APP_API + "/register",
  LOGIN_API: REACT_NATIVE_APP_API + "/login",
  USER_INFO_API: REACT_NATIVE_APP_API + "/user",
  PROVINCE_API: REACT_NATIVE_APP_API + "/provinces",
  DISTRICT_API: REACT_NATIVE_APP_API + "/districts",
  SUB_DISTRICT_API: REACT_NATIVE_APP_API + "/sub_districts",

  TEST_API: REACT_NATIVE_APP_API + "/api",
};
