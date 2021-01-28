import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjPaymentins: "OBJ_PAYMENTS_ACTIVITY_HD",
  clearObjPayment: "CLEAR_OBJ_PAYMENTS_ACTIVITY",
  setDisabledInput: "SET_DISABLED_INPUT_PAYMENTS_ACTIVITY",
  pushListTrPayment: "PUSH_LIST_TR_PAYMENTS_ACTIVITY",
  setListTrPayment: "SET_LIST_TR_PAYMENTS_ACTIVITY",
  removeListTrPayment: "REMOVE_LIST_TR_PAYMENTS_ACTIVITY",
  setEditable: "SET_EDITABLE_PAYMENTS_ACTIVITY",
};

const initialState = {
  objPaymentHD: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrPayment: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "paymentHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjPaymentins: {
        return {
          ...state,
          objPayment: action.payload.obj,
        };
      }

      case actionTypes.clearObjPayment: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrPayment: {
        return {
          ...state,
          listTrPayment: [
            ...state.listTrPayment,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrPayment: {
        return { ...state, listTrPayment: action.payload.obj };
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
  setObjPayment: (obj) => ({
    type: actionTypes.setObjPaymentins,
    payload: { obj },
  }),

  clearObjPayment: () => ({
    type: actionTypes.clearObjPayment,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrPayment: (obj) => ({
    type: actionTypes.pushListTrPayment,
    payload: { obj },
  }),
  setListTrPayment: (obj) => ({
    type: actionTypes.setListTrPayment,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
