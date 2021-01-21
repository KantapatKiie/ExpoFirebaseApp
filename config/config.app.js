const { REACT_NATIVE_APP_URL_API, REACT_NATIVE_APP_DELAY_SEARCH } = process.env;

export const DELAY_SEARCH = REACT_NATIVE_APP_DELAY_SEARCH;

const { REACT_NATIVE_APP_AUTH_API } = "http://wangdek.am2bmarketing.co.th/api/v1"

export const API_URL = {
  //Authenticate
  REGISTER_API: REACT_NATIVE_APP_AUTH_API + "/register",

  TEST_API: REACT_NATIVE_APP_URL_API + "/api",
};
