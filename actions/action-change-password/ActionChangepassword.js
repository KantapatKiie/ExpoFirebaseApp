import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjChangePasswordins: "OBJ_CHANGE_PASSWORD_HD",
  clearObjChangePassword: "CLEAR_OBJ_CHANGE_PASSWORD",
  setDisabledInput: "SET_DISABLED_INPUT_CHANGE_PASSWORD",
  pushListTrChangePassword: "PUSH_LIST_TR_CHANGE_PASSWORD",
  setListTrChangePassword: "SET_LIST_TR_CHANGE_PASSWORD",
  removeListTrChangePassword: "REMOVE_LIST_TR_CHANGE_PASSWORD",
  setEditable: "SET_EDITABLE_CHANGE_PASSWORD",
};

const initialState = {
  objChangePassword: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrChangePassword: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ChangePasswordHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjChangePasswordins: {
        return {
          ...state,
          objChangePassword: action.payload.obj,
        };
      }

      case actionTypes.clearObjChangePassword: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrChangePassword: {
        return {
          ...state,
          listTrChangePassword: [
            ...state.listTrChangePassword,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrChangePassword: {
        return { ...state, listTrChangePassword: action.payload.obj };
      }

      case actionTypes.setEditable: {
        return { ...state, editable: action.payload.bool };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjChangePassword: (obj) => ({
    type: actionTypes.setObjChangePasswordins,
    payload: { obj },
  }),

  clearObjChangePassword: () => ({
    type: actionTypes.clearObjChangePassword,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrChangePassword: (obj) => ({
    type: actionTypes.pushListTrChangePassword,
    payload: { obj },
  }),
  setListTrChangePassword: (obj) => ({
    type: actionTypes.setListTrChangePassword,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
