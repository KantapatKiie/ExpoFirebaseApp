import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjMyCouponins: "OBJ_MY_COUPON_HD_HD",
  clearObjMyCoupon: "CLEAR_OBJ_MY_COUPON_HD",
  setDisabledInput: "SET_DISABLED_INPUT_MY_COUPON_HD",
  pushListTrMyCoupon: "PUSH_LIST_TR_MY_COUPON_HD",
  setListTrMyCoupon: "SET_LIST_TR_MY_COUPON_HD",
  removeListTrMyCoupon: "REMOVE_LIST_TR_MY_COUPON_HD",
  setEditable: "SET_EDITABLE_MY_COUPON_HD",
};

const initialState = {
  objMyCoupon: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,
  },
  // listTrMyCoupon: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "MyCouponHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjMyCouponins: {
        return {
          ...state,
          objMyCoupon: action.payload.obj,
        };
      }

      case actionTypes.clearObjMyCoupon: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrMyCoupon: {
        return {
          ...state,
          listTrMyCoupon: [
            ...state.listTrMyCoupon,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrMyCoupon: {
        return { ...state, listTrMyCoupon: action.payload.obj };
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
  setObjMyCoupon: (obj) => ({
    type: actionTypes.setObjMyCouponins,
    payload: { obj },
  }),

  clearObjMyCoupon: () => ({
    type: actionTypes.clearObjMyCoupon,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrMyCoupon: (obj) => ({
    type: actionTypes.pushListTrMyCoupon,
    payload: { obj },
  }),
  setListTrMyCoupon: (obj) => ({
    type: actionTypes.setListTrMyCoupon,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
