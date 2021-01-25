import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjContactHDins: "OBJ_CONTACT_US_ACTIVITY_HD",
  clearObjContactHD: "CLEAR_OBJ_CONTACT_US_ACTIVITY",
  setDisabledInput: "SET_DISABLED_INPUT_CONTACT_US_ACTIVITY",
  pushListTrContactHD: "PUSH_LIST_TR_CONTACT_US_ACTIVITY",
  setListTrContactHD: "SET_LIST_TR_CONTACT_US_ACTIVITY",
  removeListTrContactHD: "REMOVE_LIST_TR_CONTACT_US_ACTIVITY",
  setEditable: "SET_EDITABLE_CONTACT_US_ACTIVITY",
};

const initialState = {
  objContactHD: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrContactHD: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ContactHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjContactHDins: {
        return {
          ...state,
          objContactHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjContactHD: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrContactHD: {
        return {
          ...state,
          listTrContactHD: [
            ...state.listTrContactHD,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrContactHD: {
        return { ...state, listTrContactHD: action.payload.obj };
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
  setObjContactHD: (obj) => ({
    type: actionTypes.setObjContactHDins,
    payload: { obj },
  }),

  clearObjContactHD: () => ({
    type: actionTypes.clearObjContactHD,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrContactHD: (obj) => ({
    type: actionTypes.pushListTrContactHD,
    payload: { obj },
  }),
  setListTrContactHD: (obj) => ({
    type: actionTypes.setListTrContactHD,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
