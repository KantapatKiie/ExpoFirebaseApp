import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjFlashsaleProductHDins: "OBJ_FLASHSALE_PRODUCT_HD",
  clearObjFlashsaleProductHD: "CLEAR_OBJ_FLASHSALE_PRODUCT_HD",
  setDisabledInput: "SET_DISABLED_INPUT_FLASHSALE_PRODUCT_HD",
  pushListTrFlashsaleProductHD: "PUSH_LIST_TR_FLASHSALE_PRODUCT_HD",
  setListTrFlashsaleProductHD: "SET_LIST_TR_FLASHSALE_PRODUCT_HD",
  removeListTrFlashsaleProductHD: "REMOVE_LIST_TR_FLASHSALE_PRODUCT_HD",
  setEditable: "SET_EDITABLE_FLASHSALE_PRODUCT_HD",
};

const initialState = {
  objFlashsaleProductHD: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  listTrFlashsaleProductHD: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "flashsalePHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjFlashsaleProductHDins: {
        return {
          ...state,
          objFlashsaleProductHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjFlashsaleProductHD: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrFlashsaleProductHD: {
        return {
          ...state,
          listTrFlashsaleProductHD: [
            ...state.listTrFlashsaleProductHD,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrFlashsaleProductHD: {
        return { ...state, listTrFlashsaleProductHD: action.payload.obj };
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
  setObjFlashsaleProductHD: (obj) => ({
    type: actionTypes.setObjFlashsaleProductHDins,
    payload: { obj },
  }),
  clearObjFlashsaleProductHD: () => ({
    type: actionTypes.clearObjFlashsaleProductHD,
  }),
  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrFlashsaleProductHD: (obj) => ({
    type: actionTypes.pushListTrFlashsaleProductHD,
    payload: { obj },
  }),
  setListTrFlashsaleProductHD: (obj) => ({
    type: actionTypes.setListTrFlashsaleProductHD,
    payload: { obj },
  }),
  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
