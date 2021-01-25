import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjHistoryViewins: "OBJ_HISTORY_VIEW_HD",
  clearObjHistoryView: "CLEAR_OBJ_HISTORY_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_HISTORY_VIEW",
  pushListTrHistoryView: "PUSH_LIST_TR_HISTORY_VIEW",
  setListTrHistoryView: "SET_LIST_TR_HISTORY_VIEW",
  removeListTrHistoryView: "REMOVE_LIST_TR_HISTORY_VIEW",
  setEditable: "SET_EDITABLE_HISTORY_VIEW",
};

const initialState = {
  objHistoryView: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrHistoryView: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "HistoryViewHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjHistoryViewins: {
        return {
          ...state,
          objHistoryView: action.payload.obj,
        };
      }

      case actionTypes.clearObjHistoryView: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrHistoryView: {
        return {
          ...state,
          listTrHistoryView: [
            ...state.listTrHistoryView,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrHistoryView: {
        return { ...state, listTrHistoryView: action.payload.obj };
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
  setObjHistoryView: (obj) => ({
    type: actionTypes.setObjHistoryViewins,
    payload: { obj },
  }),

  clearObjHistoryView: () => ({
    type: actionTypes.clearObjHistoryView,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrHistoryView: (obj) => ({
    type: actionTypes.pushListTrHistoryView,
    payload: { obj },
  }),
  setListTrHistoryView: (obj) => ({
    type: actionTypes.setListTrHistoryView,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
