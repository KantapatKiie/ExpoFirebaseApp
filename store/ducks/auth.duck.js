import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const actionTypes = {
  SignIn: "[SignIn] Action",
  SignOut: "[SignOut] Action",
  SignUp: "[SignUp] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
};

export const reducer = persistReducer(
  {
    storage: AsyncStorage,
    key: "auth",
    whitelist: ["user", "authToken"],
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.SignIn: {
        return { ...state, user: action.payload.obj };
      }

      case actionTypes.SignUp: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  signin: (obj) => ({ type: actionTypes.SignIn, payload: { obj } }),
  signup: (authToken) => ({
    type: actionTypes.SignUp,
    payload: { authToken },
  }),
  signout: () => ({ type: actionTypes.SignOut }),
};

export function* saga() {}
