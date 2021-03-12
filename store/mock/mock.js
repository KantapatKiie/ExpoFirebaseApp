import axios from "axios";
import { API_URL } from "../../config/config.app";

//Get Authication
const getAuthenticationToken = () => "successful_fake_token";

const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};
const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

//Get Login
export const logins = (email, password, shouldSucceed = true) => {

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: "Something went wrong!" });
  }

  return mockSuccess({ auth_token: getAuthenticationToken });
};

//Get CreateAccount
export const createAccount = (firstname, lastname, email, password, shouldSucceed = true) => {

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: "Something went wrong!" });
  }

  return mockSuccess({ auth_token: getAuthenticationToken , email: email});
};

//Get Users
export const getUsers = async (shouldSucceed = true) => {
  const token = await getToken();

  if (token !== getAuthenticationToken) {
    return mockFailure({ error: 401, message: "Invalid Request" });
  }

  return mockSuccess({
    users: [
      {
        email: "test@test.ca",
        password: "12345",
      },
      {
        email: "admin@gmail.com",
        password: "12345",
      },
    ],
  });
  // return axios.post(API_URL.LOGIN_GET_USER, { username, password });
};

export function getUserByToken() {
  return "123456";
}