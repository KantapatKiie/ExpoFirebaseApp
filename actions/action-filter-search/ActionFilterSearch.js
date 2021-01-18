import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjFilterSearchins: "OBJ_FILTER_SEARCH_VIEW_HD",
  clearObjFilterSearch: "CLEAR_OBJ_FILTER_SEARCH_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_FILTER_SEARCH_VIEW",
  pushListTrFilterSearch: "PUSH_LIST_TR_FILTER_SEARCH_VIEW",
  setListTrFilterSearch: "SET_LIST_TR_FILTER_SEARCH_VIEW",
  removeListTrFilterSearch: "REMOVE_LIST_TR_FILTER_SEARCH_VIEW",
  setEditable: "SET_EDITABLE_FILTER_SEARCH_VIEW",
};

const initialState = {
  objFilterSearch: {
    SEARCH_ORDER: "",
    STATUS_ORDER: "payment"
  },
  // listTrFilterSearch: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "FilterSearchHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjFilterSearchins: {
        return {
          ...state,
          objFilterSearch: action.payload.obj,
        };
      }

      case actionTypes.clearObjFilterSearch: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrFilterSearch: {
        return {
          ...state,
          listTrFilterSearch: [
            ...state.listTrFilterSearch,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrFilterSearch: {
        return { ...state, listTrFilterSearch: action.payload.obj };
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
  setObjFilterSearch: (obj) => ({
    type: actionTypes.setObjFilterSearchins,
    payload: { obj },
  }),

  clearObjFilterSearch: () => ({
    type: actionTypes.clearObjFilterSearch,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrFilterSearch: (obj) => ({
    type: actionTypes.pushListTrFilterSearch,
    payload: { obj },
  }),
  setListTrFilterSearch: (obj) => ({
    type: actionTypes.setListTrFilterSearch,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
