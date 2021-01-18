import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjOrderStatusins: "OBJ_ORDER_ATATUS_DETAIL_HD",
  clearObjOrderStatus: "CLEAR_OBJ_ORDER_ATATUS_DETAIL",
  setDisabledInput: "SET_DISABLED_INPUT_ORDER_ATATUS_DETAIL",
  pushListTrOrderStatus: "PUSH_LIST_TR_ORDER_ATATUS_DETAIL",
  setListTrOrderStatus: "SET_LIST_TR_ORDER_ATATUS_DETAIL",
  removeListTrOrderStatus: "REMOVE_LIST_TR_ORDER_ATATUS_DETAIL",
  setEditable: "SET_EDITABLE_ORDER_ATATUS_DETAIL",
};

const initialState = {
  objOrderStatus: {
    SEARCH_ORDER: "",
    STATUS_ORDER: "payment"
  },
  // listTrOrderStatus: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "OrderStatusHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjOrderStatusins: {
        return {
          ...state,
          objOrderStatus: action.payload.obj,
        };
      }

      case actionTypes.clearObjOrderStatus: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrOrderStatus: {
        return {
          ...state,
          listTrOrderStatus: [
            ...state.listTrOrderStatus,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrOrderStatus: {
        return { ...state, listTrOrderStatus: action.payload.obj };
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
  setObjOrderStatus: (obj) => ({
    type: actionTypes.setObjOrderStatusins,
    payload: { obj },
  }),

  clearObjOrderStatus: () => ({
    type: actionTypes.clearObjOrderStatus,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrOrderStatus: (obj) => ({
    type: actionTypes.pushListTrOrderStatus,
    payload: { obj },
  }),
  setListTrOrderStatus: (obj) => ({
    type: actionTypes.setListTrOrderStatus,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
