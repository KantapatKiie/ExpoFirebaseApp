import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjOrderStatusins: "OBJ_ORDER_STATUS_DETAIL_HD",
  clearObjOrderStatus: "CLEAR_OBJ_ORDER_STATUS_DETAIL",
  setDisabledInput: "SET_DISABLED_INPUT_ORDER_STATUS_DETAIL",
  setEditable: "SET_EDITABLE_ORDER_STATUS_DETAIL",

  setStatusObjins: "OBJ_ORDER_STATUS_DETAILS_HDS",
  clearStatusObjCls: "CLEAR_OBJ_ORDER_STATUS_DETAILS_HD",

  pushListLogisticOrderStatus: "PUSH_LIST_TR_LOGISTIC_ORDER_STATUS_DETAIL",
  setListLogisticOrderStatus: "SET_LIST_TR_LOGISTIC_ORDER_STATUS_DETAIL",

};

const initialState = {
  objOrderStatus: {
    id: 9,
    code: "ORD-2020120010",
    payment_type: "โอนเข้าบัญชีธนาคาร",
    pickup_optional: 0,
    logistics_id: 1,
    users_id: 8,
    total_amount: "6.00",
    total_weight: 112,
    discount: "0.00",
    coupons_id: null,
    promotion_discount: 0,
    delivery_charge: 2,
    fullname: "test1 test2",
    telephone: "xxxxxxxx, xxx-xxxxxxx",
    address: "aaa",
    sub_district_id: 711301,
    district_id: 794,
    province_id: 56,
    postcode: 71170,
    vat: "0.42",
    tracking_no: null,
    inv_sent_count: 0,
    inv_sent_last: null,
    inv_number: "INV-2020120010",
    rcpt_sent_count: "0",
    rcpt_sent_last: null,
    rcpt_number: null,
    status: 0,
    created_by: 5,
    updated_by: 5,
    created_at: moment(new Date()).format("YYYY-MM-DDT00:00:000"),
    updated_at: moment(new Date()).format("YYYY-MM-DDT00:00:000"),
    deleted_at: null,
  },
  statusOrder: {
    status_th: "รอการชำระเงิน",
    status_en: "Waiting for payment",
  },
  logistics_list: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "orderStatusHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjOrderStatusins: {
        return {
          ...state,
          objOrderStatus: action.payload.obj,
        };
      }
      case actionTypes.clearObjOrderStatus: {
        return initialState;
      }
      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }
      case actionTypes.setEditable: {
        return { ...state, editable: action.payload.bool };
      }

      case actionTypes.setStatusObjins: {
        return {
          ...state,
          statusOrder: action.payload.obj,
        };
      }
      case actionTypes.clearStatusObjCls: {
        return initialState;
      }

      case actionTypes.pushListLogisticOrderStatus: {
        return {
          ...state,
          logistics_list: [...state.logistics_list, action.payload.obj],
        };
      }
      case actionTypes.setListLogisticOrderStatus: {
        return { ...state, logistics_list: action.payload.obj };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjOrderStatus: (obj) => ({
    type: actionTypes.setObjOrderStatusins,
    payload: { obj },
  }),
  clearObjOrderStatus: () => ({
    type: actionTypes.clearObjOrderStatus,
  }),
  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),

  setStatusObjins: (obj) => ({
    type: actionTypes.setStatusObjins,
    payload: { obj },
  }),
  clearStatusObjCls: () => ({
    type: actionTypes.clearStatusObjCls,
  }),

  pushListLogisticOrderStatus: (obj) => ({
    type: actionTypes.pushListLogisticOrderStatus,
    payload: { obj },
  }),
  setListLogisticOrderStatus: (obj) => ({
    type: actionTypes.setListLogisticOrderStatus,
    payload: { obj },
  }),
};
