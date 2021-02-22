import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjMyCouponins: "OBJ_MY_COUPON_HD_HD",
  clearObjMyCoupon: "CLEAR_OBJ_MY_COUPON_HD",
  setListTrMyCoupon: "SET_LIST_TR_MY_COUPON_HD",
};

const initialState = {
  objMyCoupon: {
    id: 1,
    code: "A001",
    image_th: "/storage/130/coupon-th.png",
    image_en: "/storage/131/coupon-en.png",
    title1_th: "title1_th",
    title1_en: "title1_en",
    title2_th: "title2_th",
    title2_en: "title2_en",
    valid_from: "2021-02-15 11:43:00",
    valid_until: "2021-02-28 17:27:00",
  },
  listTrMyCoupon: [],
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

      case actionTypes.setListTrMyCoupon: {
        return { ...state, listTrMyCoupon: action.payload.obj };
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

  
  setListTrMyCoupon: (obj) => ({
    type: actionTypes.setListTrMyCoupon,
    payload: { obj },
  }),
};
