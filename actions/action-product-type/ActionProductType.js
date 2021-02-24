import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjProductTypeins: "OBJ_PRODUCT_TYPE_HD",
  clearObjProductType: "CLEAR_OBJ_PRODUCT_TYPE_HD",
  setDisabledInput: "SET_DISABLED_INPUT_PRODUCT_TYPE_HD",
  pushListTrProductType: "PUSH_LIST_TR_PRODUCT_TYPE_HD",
  setListTrProductType: "SET_LIST_TR_PRODUCT_TYPE_HD",
  removeListTrProductType: "REMOVE_LIST_TR_PRODUCT_TYPE_HD",
  setEditable: "SET_EDITABLE_PRODUCT_TYPE_HD",
};

const initialState = {
  objProductType: {
    id: 3,
    name_th: "เสื้อผ้า 001",
    name_en: "Clothing 001",
    image: "/storage/3/images-%281%29.jfif",
    price: "500.00",
    total_quantity: "3",

    HOME_TYPE: false,
    TABS_TYPE: false,
    PRODUCT_TYPE: "",
    ITEM_ID: 0,
    ITEM_NAME: "",
    API_TYPE: "http://10.0.1.37:8080/api/v1/products/best_selling",
    FLASHSALE: false,
  },
  listTrProductType: [],
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "ProductType" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjProductTypeins: {
        return {
          ...state,
          objProductType: action.payload.obj,
        };
      }

      case actionTypes.clearObjProductType: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrProductType: {
        return {
          ...state,
          listTrProductType: [
            ...state.listTrProductType,
            action.payload.obj,
          ],
        };
      }

      case actionTypes.setListTrProductType: {
        return { ...state, listTrProductType: action.payload.obj };
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
  setObjProductType: (obj) => ({
    type: actionTypes.setObjProductTypeins,
    payload: { obj },
  }),

  clearObjProductType: () => ({
    type: actionTypes.clearObjProductType,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrProductType: (obj) => ({
    type: actionTypes.pushListTrProductType,
    payload: { obj },
  }),
  setListTrProductType: (obj) => ({
    type: actionTypes.setListTrProductType,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
