import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjSignUp: "SET_OBJ_SIGNUP_HD",
  clearObjSignUp: "CLEAR_OBJ_SIGNUP_HD",
};

const initialState = {
  objSignUpHD: {
    EMAIL: "",
    PASSWORD_1: "",
    PASSWORD_2: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    GENDER: "",
    BIRTH_DATE: moment(new Date()).format("YYYY-MM-DD"),
    PHONE_NUMBER: "",
    GENDER: "Male",

    // Region
    ADDRESS_NAME: "",
    PROVINCE_CODE: "",
    PROVINCE_NAME: "",
    DISTRICT_CODE: "",
    DISTRICT_NAME: "",
    SUB_DISTRICT_CODE: "",
    SUB_DISTRICT_NAME: "",
    ZIP_CODE: "",

    // Region Order
    ADDRESS_NAME_ORDER: "",
    PROVINCE_CODE_ORDER: "",
    PROVINCE_NAME_ORDER: "",
    DISTRICT_CODE_ORDER: "",
    DISTRICT_NAME_ORDER: "",
    SUB_DISTRICT_CODE_ORDER: "",
    SUB_DISTRICT_NAME_ORDER: "",
    ZIP_CODE_ORDER: "",
    PHONE_NUMBER_ORDER: "",

    RECEIVE_INFO: true,
    PRIVACY_CONFIRM: false,

    INSERT_ID: "User",
    INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "signUp" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjSignUp:
        return { ...state, objSignUpHD: action.payload.obj };

        case actionTypes.clearObjSignUp: {
          return initialState;
        }

        default:
          return initialState;
    }
  }
);

export const actions = {
  setObjSignUp: (obj) => ({ type: actionTypes.setObjSignUp, payload: { obj } }),

  clearObjSignUp: () => ({ type: actionTypes.clearObjSignUp }),
};
