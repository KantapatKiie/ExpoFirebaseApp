import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjProductAllins: "OBJ_PRODUCT_ALL_VIEW_HD",
  clearObjProductAll: "CLEAR_OBJ_PRODUCT_ALL_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_PRODUCT_ALL_VIEW",
  pushListTrProductAll: "PUSH_LIST_TR_PRODUCT_ALL_VIEW",
  setListTrProductAll: "SET_LIST_TR_PRODUCT_ALL_VIEW",
  removeListTrProductAll: "REMOVE_LIST_TR_PRODUCT_ALL_VIEW",
  setEditable: "SET_EDITABLE_PRODUCT_ALL_VIEW",
};

const initialState = {
  objProductAll: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrProductAll: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ProductAllHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjProductAllins: {
        return {
          ...state,
          objProductAll: action.payload.obj,
        };
      }

      case actionTypes.clearObjProductAll: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrProductAll: {
        return {
          ...state,
          listTrProductAll: [
            ...state.listTrProductAll,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrProductAll: {
        return { ...state, listTrProductAll: action.payload.obj };
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
  setObjProductAll: (obj) => ({
    type: actionTypes.setObjProductAllins,
    payload: { obj },
  }),

  clearObjProductAll: () => ({
    type: actionTypes.clearObjProductAll,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrProductAll: (obj) => ({
    type: actionTypes.pushListTrProductAll,
    payload: { obj },
  }),
  setListTrProductAll: (obj) => ({
    type: actionTypes.setListTrProductAll,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
