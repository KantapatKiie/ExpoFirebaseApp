import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjLogin: "SET_OBJ_LOGIN_HD",
  clearObjLogin: "CLEAR_OBJ_LOGIN_HD",
};

const initialState = {
  objLoginHD: {
    EMAIL: "",
    PASSWORD: "",
    TOKEN: "",
    ID: 0,
    GUEST: 0,
    FIRST_NAME: "a",
    LAST_NAME: "a",
    EMAIL: "abcd@email.com",
    ACTIVE: 0,
    EMAIL_VERIFIED_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
    CREATE_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
    UPDATED_AT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
    CREATE_BY: 0,
    UPDATED_BY: 0,
    DELETED_AT: null,

    TELEPHONE: "00",
    ADDRESS: "11/11",
    PROVINCE_ID: 1,
    PROVINCE_NAME: "",
    DISTRICT_ID: 1,
    DISTRICT_NAME:"",
    SUB_DISTRICT_ID: 1,
    SUB_DISTRICT_NAME:"",
    ZIP_CODE: "10000",
    ADDRESS_FULL_NAME: "aa",
    // INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "login" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjLogin:
        return { ...state, objLoginHD: action.payload.obj };

      case actionTypes.clearObjLogin: {
        return initialState;
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjLogin: (obj) => ({ type: actionTypes.setObjLogin, payload: { obj } }),

  clearObjLogin: () => ({ type: actionTypes.clearObjLogin }),
};
