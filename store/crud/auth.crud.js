import axios from "axios";
import { API_URL } from "../../config/config.app";
export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "api/me";

// export function signin(username, password) {
//   return axios.post(API_URL.LOGIN_GET_USER, { username, password });
// }

// export function signup(email, fullname, username, password) {
//   return axios.post(REGISTER_URL, { email, fullname, username, password });
// }

// export function requestPassword(email) {
//   return axios.post(REQUEST_PASSWORD_URL, { email });
// }

// export function changePassword(
//   USERID,
//   PASSWRD,
// ) {
//   return axios.post(API_URL.LOGIN_UPDATE_DATA_CHANGE_PASSWORD, {
//     USERID,
//     PASSWRD,
//   });
// }

// export function getUser(username, password) {
//   return axios.post(API_URL.LOGIN_GET_USER, { username, password });
// }

export function getUserByToken() {
  return "123456";
}
