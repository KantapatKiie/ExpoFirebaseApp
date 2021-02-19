import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjPromotionsins: "OBJ_PROMOTIONS_VIEW_HD",
  clearObjPromotions: "CLEAR_OBJ_PROMOTIONS_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_PROMOTIONS_VIEW",
  pushListTrPromotions: "PUSH_LIST_TR_PROMOTIONS_VIEW",
  setListTrPromotions: "SET_LIST_TR_PROMOTIONS_VIEW",
  removeListTrPromotions: "REMOVE_LIST_TR_PROMOTIONS_VIEW",
  setEditable: "SET_EDITABLE_PROMOTIONS_VIEW",
};

const initialState = {
  objPromotions: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  listTrPromotions: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "PromotionsHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjPromotionsins: {
        return {
          ...state,
          objPromotions: action.payload.obj,
        };
      }

      case actionTypes.clearObjPromotions: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrPromotions: {
        return {
          ...state,
          listTrPromotions: [
            ...state.listTrPromotions,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrPromotions: {
        return { ...state, listTrPromotions: action.payload.obj };
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
  setObjPromotions: (obj) => ({
    type: actionTypes.setObjPromotionsins,
    payload: { obj },
  }),

  clearObjPromotions: () => ({
    type: actionTypes.clearObjPromotions,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrPromotions: (obj) => ({
    type: actionTypes.pushListTrPromotions,
    payload: { obj },
  }),
  setListTrPromotions: (obj) => ({
    type: actionTypes.setListTrPromotions,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
