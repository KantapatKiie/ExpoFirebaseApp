import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjSearchHDins: "OBJ_SEARCH_MASTER_HD",
  clearObjSearchHD: "CLEAR_OBJ_SEARCH_MASTER",
  setDisabledInput: "SET_DISABLED_INPUT_SEARCH_MASTER",
  pushListTrSearchHD: "PUSH_LIST_TR_SEARCH_MASTER",
  setListTrSearchHD: "SET_LIST_TR_SEARCH_MASTER",
  removeListTrSearchHD: "REMOVE_LIST_TR_SEARCH_MASTER",
  setEditable: "SET_EDITABLE_SEARCH_MASTER"
};

const initialState = {
  objSearchHD: {
    SEARCH_NAME: "Master Origin Test Store",
    SEARCH_DATE: moment(new Date()).format("DD/MM/YYYY"),
    INSERT_ID: "",
    INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
  listTrSearchHD: [],
  disabledInput: false,
  editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "searchHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjSearchHDins: {
        return {
          ...state,
          objSearchHD: action.payload.obj,
          editable: false
        };
      }

      case actionTypes.clearObjSearchHD: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrSearchHD: {
        return {
          ...state,
          listTrSearchHD: [...state.listTrSearchHD, action.payload.obj]
        };
      }

      case actionTypes.setListTrSearchHD: {
        return { ...state, listTrSearchHD: action.payload.obj };
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
  setObjSearchHD: obj => ({
    type: actionTypes.setObjSearchHDins,
    payload: { obj }
  }),

  clearObjSearchHD: () => ({ type: actionTypes.clearObjSearchHD }),

  setDisabledInput: bool => ({
    type: actionTypes.setDisabledInput,
    payload: { bool }
  }),
  pushListTrSearchHD: obj => ({
    type: actionTypes.pushListTrSearchHD,
    payload: { obj }
  }),
  setListTrSearchHD: obj => ({
    type: actionTypes.setListTrSearchHD,
    payload: { obj }
  }),

  setEditable: bool => ({
    type: actionTypes.setEditable,
    payload: { bool }
  })
};
