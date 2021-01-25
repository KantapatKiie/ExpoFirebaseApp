import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actionTypes = {
  SetLanguage: "i18n/SET_LANGUAGE",
};

const initialState = {
  lang: "th",
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "i18n" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SetLanguage:
        return { ...state, lang: action.payload.lang };

      default:
        return state;
    }
  }
);

export const actions = {
  setLanguage: (lang) => ({ type: actionTypes.SetLanguage, payload: { lang } }),
};
