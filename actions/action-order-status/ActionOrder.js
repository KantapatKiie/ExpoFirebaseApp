import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setobjOrderScreenins: "OBJ_ORDER_PRODUCTS_DETAIL_HD",
  setobjOrderStatusPriceScreenins: "OBJ_ORDER_STAUS_PRICEPRODUCTS_DETAIL_HD",
  clearobjOrderScreen: "CLEAR_OBJ_ORDER_PRODUCTS_DETAIL",
  setDisabledInput: "SET_DISABLED_INPUT_ORDER_PRODUCTS_DETAIL",
  pushListTrOrder: "PUSH_LIST_TR_ORDER_PRODUCTS_DETAIL",
  setListTrOrder: "SET_LIST_TR_ORDER_PRODUCTS_DETAIL",
  removeListTrOrder: "REMOVE_LIST_TR_ORDER_PRODUCTS_DETAIL",
  setEditable: "SET_EDITABLE_ORDER_PRODUCTS_DETAIL",

  //use-option-orderScreen
  setObjUseCouponins: "OBJ_COUPON_DELIVERY_PRODUCTS_DETAIL_HD",
  setObjUseDeliveryins: "OBJ_USE_DELIVERY_PRODUCTS_DETAIL_HD",
  setObjUseAdressDeliveryins: "OBJ_ADDRESS_DELIVERY_PRODUCTS_DETAIL_HD",
};

const initialState = {
  objOrderScreen: {
    //Fix Address
    FIRST_NAME: "",
    LAST_NAME: "",
    // Region
    ADDRESS_NAME: "",
    PROVINCE_CODE: "",
    PROVINCE_NAME: "",
    DISTRICT_CODE: "",
    DISTRICT_NAME: "",
    SUB_DISTRICT_CODE: "",
    SUB_DISTRICT_NAME: "",
    ZIP_CODE: "",
  },
  objOrderStatusPriceScreen: {
    id: 9,
    code: "ORD-2020120010",
    payment_type: "โอนเข้าบัญชีธนาคาร",
    pickup_optional: 0,
    logistics_id: 1,
    users_id: 8,
    total_amount: "6.00",
    total_full_amounts: "0.00",
    total_weight: 112,
    discount: "0.00",
    promotion_discount: 0,
    coupon_discount: 0,
    coupons_id: null,
    delivery_charge: 2,
    fullname: "test1 test2",
    telephone: "xxxxxxxx, xxx-xxxxxxx",
    address: "aaa",
    sub_district_id: 711301,
    district_id: 794,
    province_id: 56,
    postcode: 71170,
    vat: "0.00",
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
  objUseCoupon: {
    code: "Z00000",
    id: 0,
    image: "/storage/83/coupon-2.png",
    title1_en: "title1_en",
    title1_th: "title1_th",
    title2_en: "title2_en",
    title2_th: "title2_th",
    coupon_discount: 0,
  },
  objUseDelivery: {
    id: 0,
    base_price: "50.00",
    image: "/storage/5/download.png",
    name_en: "Kerry",
    name_th: "เคอร์รี่",
    period: "3-5",
  },
  objUseAddressDelivery: {
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL: "",
    PHONE_NUMBER_ORDER: "",
    ADDRESS_NAME_ORDER: "",
    PROVINCE_CODE_ORDER: 1,
    PROVINCE_NAME_ORDER: "",
    DISTRICT_CODE_ORDER: 1,
    DISTRICT_NAME_ORDER: "",
    SUB_DISTRICT_CODE_ORDER: 1,
    SUB_DISTRICT_NAME_ORDER: "",
    ZIP_CODE_ORDER: "",

    FIRST_NAME_ORIGINAL: "",
    LAST_NAME_ORIGINAL: "",
    PHONE_NUMBER_ORDER_ORIGINAL: "",
    ADDRESS_NAME_ORDER_ORIGINAL: "",
    EMAIL_ORIGINAL: "",
    PROVINCE_CODE_ORDER_ORIGINAL: 1,
    PROVINCE_NAME_ORDER_ORIGINAL: "",
    DISTRICT_CODE_ORDER_ORIGINAL: 1,
    DISTRICT_NAME_ORDER_ORIGINAL: "",
    SUB_DISTRICT_CODE_ORDER_ORIGINAL: 1,
    SUB_DISTRICT_NAME_ORDER_ORIGINAL: "",
    ZIP_CODE_ORDER_ORIGINAL: "",

    TOKEN: "",
  },
  listTrOrder: [],
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "OrderHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setobjOrderScreenins: {
        return {
          ...state,
          objOrderScreen: action.payload.obj,
        };
      }

      case actionTypes.setobjOrderStatusPriceScreenins: {
        return {
          ...state,
          objOrderStatusPriceScreen: action.payload.obj,
        };
      }

      case actionTypes.setObjUseCouponins: {
        return {
          ...state,
          objUseCoupon: action.payload.obj,
        };
      }

      case actionTypes.setObjUseDeliveryins: {
        return {
          ...state,
          objUseDelivery: action.payload.obj,
        };
      }

      case actionTypes.setObjUseAdressDeliveryins: {
        return {
          ...state,
          objUseAddressDelivery: action.payload.obj,
        };
      }

      case actionTypes.clearobjOrderScreen: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrOrder: {
        return {
          ...state,
          listTrOrder: [...state.listTrOrder, action.payload.obj],
        };
      }

      case actionTypes.setListTrOrder: {
        return { ...state, listTrOrder: action.payload.obj };
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
  setobjOrderScreen: (obj) => ({
    type: actionTypes.setobjOrderScreenins,
    payload: { obj },
  }),

  setobjOrderStatusPriceScreenins: (obj) => ({
    type: actionTypes.setobjOrderStatusPriceScreenins,
    payload: { obj },
  }),

  setObjUseCoupon: (obj) => ({
    type: actionTypes.setObjUseCouponins,
    payload: { obj },
  }),
  setObjUseDelivery: (obj) => ({
    type: actionTypes.setObjUseDeliveryins,
    payload: { obj },
  }),
  setObjUseAddressDelivery: (obj) => ({
    type: actionTypes.setObjUseAdressDeliveryins,
    payload: { obj },
  }),
  
  clearobjOrderScreen: () => ({
    type: actionTypes.clearobjOrderScreen,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrOrder: (obj) => ({
    type: actionTypes.pushListTrOrder,
    payload: { obj },
  }),
  setListTrOrder: (obj) => ({
    type: actionTypes.setListTrOrder,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
