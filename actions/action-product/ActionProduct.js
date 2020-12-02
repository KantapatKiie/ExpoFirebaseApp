import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjProductActivityins: "OBJ_PRODUCT_ACTIVITY_HD",
  clearObjProductActivity: "CLEAR_OBJ_PRODUCT_ACTIVITY",
  setDisabledInput: "SET_DISABLED_INPUT_PRODUCT_ACTIVITY",
  pushListTrProductActivity: "PUSH_LIST_TR_PRODUCT_ACTIVITY",
  setListTrProductActivity: "SET_LIST_TR_PRODUCT_ACTIVITY",
  removeListTrProductActivity: "REMOVE_LIST_TR_PRODUCT_ACTIVITY",
  setEditable: "SET_EDITABLE_PRODUCT_ACTIVITY",
};

const initialState = {
  objProductActivity: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrProductActivity: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "productActivity" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjProductActivityins: {
        return {
          ...state,
          objProductActivity: action.payload.obj,
        };
      }

      case actionTypes.clearObjProductActivity: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrProductActivity: {
        return {
          ...state,
          listTrProductActivity: [
            ...state.listTrProductActivity,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrProductActivity: {
        return { ...state, listTrProductActivity: action.payload.obj };
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
  setObjProductActivity: (obj) => ({
    type: actionTypes.setObjProductActivityins,
    payload: { obj },
  }),

  clearObjProductActivity: () => ({
    type: actionTypes.clearObjProductActivity,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrProductActivity: (obj) => ({
    type: actionTypes.pushListTrProductActivity,
    payload: { obj },
  }),
  setListTrProductActivity: (obj) => ({
    type: actionTypes.setListTrProductActivity,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
