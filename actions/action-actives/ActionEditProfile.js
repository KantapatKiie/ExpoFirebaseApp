import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjEditProfile: "SET_OBJ_EDIT_PROFILE_HD",
  clearObjEditProfile: "CLEAR_OBJ_EDIT_PROFILE_HD",
  pushListTrEditProfileHD: "PUSH_LIST_TR_EDIT_PROFILE_VIEW",
  setListTrEditProfileHD: "SET_LIST_TR_EDIT_PROFILE_VIEW",
  removeListTrEditProfileHD: "REMOVE_LIST_TR_EDIT_PROFILE_VIEW",
};

const initialState = {
  objEditProfileHD: {
    EMAIL: "",
    PASSWORD_1: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    BIRTH_DATE: moment(new Date()).format("YYYY-MM-DD"),
    PHONE_NUMBER: "",
    SEX: 1,
    TOKEN: "",

    // Region
    PROFILE_ID: "",
    ADDRESS_NAME: "",
    PROVINCE_CODE: "",
    PROVINCE_NAME: "",
    DISTRICT_CODE: "",
    DISTRICT_NAME: "",
    SUB_DISTRICT_CODE: "",
    SUB_DISTRICT_NAME: "",
    ZIP_CODE: "",

    // Region Order
    ADDRESS_DELIVERIES_ID: 0,
    ADDRESS_NAME_ORDER: "",
    PROVINCE_CODE_ORDER: "",
    PROVINCE_NAME_ORDER: "",
    DISTRICT_CODE_ORDER: "",
    DISTRICT_NAME_ORDER: "",
    SUB_DISTRICT_CODE_ORDER: "",
    SUB_DISTRICT_NAME_ORDER: "",
    ZIP_CODE_ORDER: "",
    PHONE_NUMBER_ORDER: "",

    //Push List EditProfile
    profile_id: 5,
    sex: 1,
    birthday: "0000-00-00",
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
  },
  listTrEditProfileHD: [],
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "editProfileHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjEditProfile:
        return { ...state, objEditProfileHD: action.payload.obj };

      case actionTypes.clearObjEditProfile: {
        return initialState;
      }

      case actionTypes.pushListTrEditProfileHD: {
        return {
          ...state,
          listTrEditProfileHD: [
            ...state.listTrEditProfileHD,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrEditProfileHD: {
        return { ...state, listTrEditProfileHD: action.payload.obj };
      }

      case actionTypes.removeListTrEditProfileHD: {
        return {
          ...state,
          listTrEditProfileHD: state.listTrEditProfileHD.filter(
            (item, index) => index !== action.payload.key
          ),
        };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjEditProfile: (obj) => ({
    type: actionTypes.setObjEditProfile,
    payload: { obj },
  }),

  pushListTrEditProfileHD: (obj) => ({
    type: actionTypes.pushListTrEditProfileHD,
    payload: { obj },
  }),

  setListTrEditProfileHD: (obj) => ({
    type: actionTypes.setListTrEditProfileHD,
    payload: { obj },
  }),

  removeListTrEditProfileHD: (key) => ({
    type: actionTypes.removeListTrEditProfileHD,
    payload: { key },
  }),

  clearObjEditProfile: () => ({ type: actionTypes.clearObjEditProfile }),
};
