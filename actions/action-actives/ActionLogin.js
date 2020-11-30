import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjLogin: "SET_OBJ_LOGIN",
};

const initialState = {
  objLoginHD: {
    EMAIL: "",
    PASSWORD: "",
    INSERT_ID: "admin",
    INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "login" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjLogin:
        return { ...state, objLoginHD: action.payload.obj };

        default:
          return initialState;
    }
  }
);

export const actions = {
  setObjLogin: (obj) => ({ type: actionTypes.setObjLogin, payload: { obj } }),
};
