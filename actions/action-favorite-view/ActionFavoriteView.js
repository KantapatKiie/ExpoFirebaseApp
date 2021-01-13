import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjFavoriteViewins: "OBJ_FAVORITE_VIEW_HD",
  clearObjFavoriteView: "CLEAR_OBJ_FAVORITE_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_FAVORITE_VIEW",
  pushListTrFavoriteView: "PUSH_LIST_TR_FAVORITE_VIEW",
  setListTrFavoriteView: "SET_LIST_TR_FAVORITE_VIEW",
  removeListTrFavoriteView: "REMOVE_LIST_TR_FAVORITE_VIEW",
  setEditable: "SET_EDITABLE_FAVORITE_VIEW",
};

const initialState = {
  objFavoriteView: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrFavoriteView: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "FavoriteViewHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjFavoriteViewins: {
        return {
          ...state,
          objFavoriteView: action.payload.obj,
        };
      }

      case actionTypes.clearObjFavoriteView: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrFavoriteView: {
        return {
          ...state,
          listTrFavoriteView: [
            ...state.listTrFavoriteView,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrFavoriteView: {
        return { ...state, listTrFavoriteView: action.payload.obj };
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
  setObjFavoriteView: (obj) => ({
    type: actionTypes.setObjFavoriteViewins,
    payload: { obj },
  }),

  clearObjFavoriteView: () => ({
    type: actionTypes.clearObjFavoriteView,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrFavoriteView: (obj) => ({
    type: actionTypes.pushListTrFavoriteView,
    payload: { obj },
  }),
  setListTrFavoriteView: (obj) => ({
    type: actionTypes.setListTrFavoriteView,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
