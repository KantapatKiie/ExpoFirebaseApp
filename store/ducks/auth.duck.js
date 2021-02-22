import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actionTypes = {
  setTokenGenerate: "ACTION_SET_TOKENS_STATE_HD",
};

const initialState = {
  auth_token: undefined,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "tokensGenerateApp" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setTokenGenerate:
        return { ...state, auth_token: action.payload.auth_token };

      default:
        return state;
    }
  }
);

export const actions = {
  setTokenGenerate: (auth_token) => ({ type: actionTypes.setTokenGenerate, payload: { auth_token } }),
};
