import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjProductToysins: "OBJ_PRODUCT_TOYS_VIEW_HD",
  clearObjProductToys: "CLEAR_OBJ_PRODUCT_TOYS_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_PRODUCT_TOYS_VIEW",
  pushListTrProductToys: "PUSH_LIST_TR_PRODUCT_TOYS_VIEW",
  setListTrProductToys: "SET_LIST_TR_PRODUCT_TOYS_VIEW",
  removeListTrProductToys: "REMOVE_LIST_TR_PRODUCT_TOYS_VIEW",
  setEditable: "SET_EDITABLE_PRODUCT_TOYS_VIEW",
};

const initialState = {
  objProductToys: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrProductToys: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ProductToysHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjProductToysins: {
        return {
          ...state,
          objProductToys: action.payload.obj,
        };
      }

      case actionTypes.clearObjProductToys: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrProductToys: {
        return {
          ...state,
          listTrProductToys: [
            ...state.listTrProductToys,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrProductToys: {
        return { ...state, listTrProductToys: action.payload.obj };
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
  setObjProductToys: (obj) => ({
    type: actionTypes.setObjProductToysins,
    payload: { obj },
  }),

  clearObjProductToys: () => ({
    type: actionTypes.clearObjProductToys,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrProductToys: (obj) => ({
    type: actionTypes.pushListTrProductToys,
    payload: { obj },
  }),
  setListTrProductToys: (obj) => ({
    type: actionTypes.setListTrProductToys,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
