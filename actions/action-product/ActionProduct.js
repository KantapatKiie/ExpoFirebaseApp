import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjProductActivityins: "OBJ_PRODUCTS_ACTIVITY_HD",
  clearObjProductActivity: "CLEAR_OBJ_PRODUCTS_ACTIVITY_HD",
};

const initialState = {
  objProductActivity: {
    TITLE: "",
    DETAIL: "",
    IMAGE: "",
    PRICE: 0,
    COUNT: 1,
    TOTAL_PRICE: 0,

    flash_sale_events_id: 0,
    flash_sales_id: 0,
    product_id: 3,
    product_name_th: "เสื้อผ้า 001",
    product_name_en: "Clothing 001",
    product_description_th: "<p>description_th</p>",
    product_description_en: "<p>description_en</p>",
    product_info_th: "<p>info_th</p>",
    product_info_en: "<p>info_en</p>",
    product_image: "/storage/3/images-%281%29.jfif",
    product_full_price: "600.00",
    product_price: 450,
    product_brand: "Coming",
    product_stock: 10,
    product_favorite: 1,
    stock: 1,
    quantity: 1,
    amount: 1,
    discount: 1,

    product_sold: 0,
    timeEnds: 0,
    progressPercent: 0,
    FLASHSALE: false,
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "productActivityHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjProductActivityins: {
        return {
          ...state,
          objProductActivity: action.payload.obj,
        };
      }

      case actionTypes.clearObjProductActivity: {
        return initialState;
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjProductActivity: (obj) => ({
    type: actionTypes.setObjProductActivityins,
    payload: { obj },
  }),

  clearObjProductActivity: () => ({
    type: actionTypes.clearObjProductActivity,
  }),
};
