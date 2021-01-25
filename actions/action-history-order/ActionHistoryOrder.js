import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjHistoryOrderins: "OBJ_HISTORY_ORDER_STATUS_HD",
  clearObjHistoryOrder: "CLEAR_OBJ_HISTORY_ORDER_STATUS",
  setDisabledInput: "SET_DISABLED_INPUT_HISTORY_ORDER_STATUS",
  pushListTrHistoryOrder: "PUSH_LIST_TR_HISTORY_ORDER_STATUS",
  setListTrHistoryOrder: "SET_LIST_TR_HISTORY_ORDER_STATUS",
  removeListTrHistoryOrder: "REMOVE_LIST_TR_HISTORY_ORDER_STATUS",
  setEditable: "SET_EDITABLE_HISTORY_ORDER_STATUS",
};

const initialState = {
  objHistoryOrder: {
    SEARCH_ORDER: "",
    STATUS_ORDER: "payment"
  },
  // listTrHistoryOrder: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "HistoryOrderHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjHistoryOrderins: {
        return {
          ...state,
          objHistoryOrder: action.payload.obj,
        };
      }

      case actionTypes.clearObjHistoryOrder: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrHistoryOrder: {
        return {
          ...state,
          listTrHistoryOrder: [
            ...state.listTrHistoryOrder,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrHistoryOrder: {
        return { ...state, listTrHistoryOrder: action.payload.obj };
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
  setObjHistoryOrder: (obj) => ({
    type: actionTypes.setObjHistoryOrderins,
    payload: { obj },
  }),

  clearObjHistoryOrder: () => ({
    type: actionTypes.clearObjHistoryOrder,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrHistoryOrder: (obj) => ({
    type: actionTypes.pushListTrHistoryOrder,
    payload: { obj },
  }),
  setListTrHistoryOrder: (obj) => ({
    type: actionTypes.setListTrHistoryOrder,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
