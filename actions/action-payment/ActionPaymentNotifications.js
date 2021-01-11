import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjPaymentNotificationins: "OBJ_PAYMENT_NOTIFICATIONS_ACTIVITY_HD",
  clearObjPaymentNotification: "CLEAR_OBJ_PAYMENT_NOTIFICATIONS_ACTIVITY",
  setDisabledInput: "SET_DISABLED_INPUT_PAYMENT_NOTIFICATIONS_ACTIVITY",
  pushListTrPaymentNotification: "PUSH_LIST_TR_PAYMENT_NOTIFICATIONS_ACTIVITY",
  setListTrPaymentNotification: "SET_LIST_TR_PAYMENT_NOTIFICATIONS_ACTIVITY",
  removeListTrPaymentNotification: "REMOVE_LIST_TR_PAYMENT_NOTIFICATIONS_ACTIVITY",
  setEditable: "SET_EDITABLE_PAYMENT_NOTIFICATIONS_ACTIVITY",
};

const initialState = {
  objPaymentNotificationHD: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrPaymentNotification: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "paymentNotificationHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjPaymentNotificationins: {
        return {
          ...state,
          objPaymentNotification: action.payload.obj,
        };
      }

      case actionTypes.clearObjPaymentNotification: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrPaymentNotification: {
        return {
          ...state,
          listTrPaymentNotification: [
            ...state.listTrPaymentNotification,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrPaymentNotification: {
        return { ...state, listTrPaymentNotification: action.payload.obj };
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
  setObjPaymentNotification: (obj) => ({
    type: actionTypes.setObjPaymentNotificationins,
    payload: { obj },
  }),

  clearObjPaymentNotification: () => ({
    type: actionTypes.clearObjPaymentNotification,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrPaymentNotification: (obj) => ({
    type: actionTypes.pushListTrPaymentNotification,
    payload: { obj },
  }),
  setListTrPaymentNotification: (obj) => ({
    type: actionTypes.setListTrPaymentNotification,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
