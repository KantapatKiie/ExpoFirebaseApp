import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjForgetPasswordins: "OBJ_FORGET_PASSWORD_HD",
  clearObjForgetPassword: "CLEAR_OBJ_FORGET_PASSWORD",
  setDisabledInput: "SET_DISABLED_INPUT_FORGET_PASSWORD",
  pushListTrForgetPassword: "PUSH_LIST_TR_FORGET_PASSWORD",
  setListTrForgetPassword: "SET_LIST_TR_FORGET_PASSWORD",
  removeListTrForgetPassword: "REMOVE_LIST_TR_FORGET_PASSWORD",
  setEditable: "SET_EDITABLE_FORGET_PASSWORD",
};

const initialState = {
  objForgetPassword: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrForgetPassword: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ForgetPasswordHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjForgetPasswordins: {
        return {
          ...state,
          objForgetPassword: action.payload.obj,
        };
      }

      case actionTypes.clearObjForgetPassword: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrForgetPassword: {
        return {
          ...state,
          listTrForgetPassword: [
            ...state.listTrForgetPassword,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrForgetPassword: {
        return { ...state, listTrForgetPassword: action.payload.obj };
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
  setObjForgetPassword: (obj) => ({
    type: actionTypes.setObjForgetPasswordins,
    payload: { obj },
  }),

  clearObjForgetPassword: () => ({
    type: actionTypes.clearObjForgetPassword,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrForgetPassword: (obj) => ({
    type: actionTypes.pushListTrForgetPassword,
    payload: { obj },
  }),
  setListTrForgetPassword: (obj) => ({
    type: actionTypes.setListTrForgetPassword,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
