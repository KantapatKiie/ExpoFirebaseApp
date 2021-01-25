import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setobjOrderScreenins: "OBJ_ORDER_PRODUCTS_DETAIL_HD",
  clearobjOrderScreen: "CLEAR_OBJ_ORDER_PRODUCTS_DETAIL",
  setDisabledInput: "SET_DISABLED_INPUT_ORDER_PRODUCTS_DETAIL",
  pushListTrOrder: "PUSH_LIST_TR_ORDER_PRODUCTS_DETAIL",
  setListTrOrder: "SET_LIST_TR_ORDER_PRODUCTS_DETAIL",
  removeListTrOrder: "REMOVE_LIST_TR_ORDER_PRODUCTS_DETAIL",
  setEditable: "SET_EDITABLE_ORDER_PRODUCTS_DETAIL",
};

const initialState = {
  objOrderScreen: {
    //Fix Address
    FIRST_NAME: "",
    LAST_NAME: "",
    // Region
    ADDRESS_NAME: "",
    PROVINCE_CODE: "",
    PROVINCE_NAME: "",
    DISTRICT_CODE: "",
    DISTRICT_NAME: "",
    SUB_DISTRICT_CODE: "",
    SUB_DISTRICT_NAME: "",
    ZIP_CODE: "",
  },
  // listTrOrder: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "OrderHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setobjOrderScreenins: {
        return {
          ...state,
          objOrderScreen: action.payload.obj,
        };
      }

      case actionTypes.clearobjOrderScreen: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrOrder: {
        return {
          ...state,
          listTrOrder: [...state.listTrOrder, action.payload.obj],
        };
      }

      case actionTypes.setListTrOrder: {
        return { ...state, listTrOrder: action.payload.obj };
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
  setobjOrderScreen: (obj) => ({
    type: actionTypes.setobjOrderScreenins,
    payload: { obj },
  }),

  clearobjOrderScreen: () => ({
    type: actionTypes.clearobjOrderScreen,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrOrder: (obj) => ({
    type: actionTypes.pushListTrOrder,
    payload: { obj },
  }),
  setListTrOrder: (obj) => ({
    type: actionTypes.setListTrOrder,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
