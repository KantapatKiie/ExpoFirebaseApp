import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjLogin: "SET_OBJ_LOGIN_HD",
  clearObjLogin: "CLEAR_OBJ_LOGIN_HD",
  pushListTrLoginHD: "PUSH_LIST_TR_LOGIN_LIST_TR",
  setListTrLoginHD: "SET_LIST_TR_LOGIN_LIST_TR",
  removeListTrLoginHD: "REMOVE_LIST_TR_LOGIN_LIST_TR",
};

const initialState = {
  objLoginHD: {
    EMAIL: "",
    PASSWORD: "",
    IMAGE: "",
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
    DISTRICT_NAME: "",
    SUB_DISTRICT_ID: 1,
    SUB_DISTRICT_NAME: "",
    ZIP_CODE: "10000",
    ADDRESS_FULL_NAME: "aa",

    //Push List EditProfile
    profile_id: 5,
    sex: 1,
    birthday: moment(new Date()).format("YYYY-MM-DD"),
    telephone: "1",
    address: "a",
    province_id: 1,
    district_id: 1,
    sub_district_id: 1,
    postcode: "1",
    receive_info: 0,

    address_deliveries_id: 5,
    address_deliveries: "a",
    province_id_deliveries: 1,
    district_id_deliveries: 1,
    sub_district_id_deliveries: 1,
    postcode_deliveries: "1",
    telephone_deliveries: "1",

    ORDER_COMPLETED: 0,
    ORDER_CANCELLED: 0,
  },
  listTrLoginHD: [],
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

      case actionTypes.pushListTrLoginHD: {
        return {
          ...state,
          listTrLoginHD: [...state.listTrLoginHD, action.payload.obj],
        };
      }

      case actionTypes.setListTrLoginHD: {
        return { ...state, listTrLoginHD: action.payload.obj };
      }

      case actionTypes.removeListTrLoginHD: {
        return {
          ...state,
          listTrLoginHD: state.listTrLoginHD.filter(
            (item, index) => index !== action.payload.key
          )
        };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjLogin: (obj) => ({ type: actionTypes.setObjLogin, payload: { obj } }),

  pushListTrLoginHD: (obj) => ({
    type: actionTypes.pushListTrLoginHD,
    payload: { obj },
  }),
  setListTrLoginHD: (obj) => ({
    type: actionTypes.setListTrLoginHD,
    payload: { obj },
  }),
  removeListTrLoginHD: key => ({
    type: actionTypes.removeListTrLoginHD,
    payload: { key }
  }),

  clearObjLogin: () => ({ type: actionTypes.clearObjLogin }),
};
