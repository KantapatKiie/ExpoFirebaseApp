import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
import moment from "moment";

const actionTypes = {
  setObjCartBasketins: "OBJ_CART_BASKET_HD",
  clearObjCartBasket: "CLEAR_OBJ_CART_BASKET",
  setDisabledInput: "SET_DISABLED_INPUT_CART_BASKET",
  pushListTrCartBasket: "PUSH_LIST_TR_CART_BASKET",
  setListTrCartBasket: "SET_LIST_TR_CART_BASKET",
  removeListTrCartBasket: "REMOVE_LIST_TR_CART_BASKET",
  setEditable: "SET_EDITABLE_CART_BASKET"
};

const initialState = {
  objCartBasket: {
    CART_ID: "CRT001",
    COUNT: 0,
    INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
  listTrCartBasket: [],
  disabledInput: false,
  editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "cartBasket" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjCartBasketins: {
        return {
          ...state,
          objCartBasket: action.payload.obj,
          editable: false
        };
      }

      case actionTypes.clearObjCartBasket: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrCartBasket: {
        return {
          ...state,
          listTrCartBasket: [...state.listTrCartBasket, action.payload.obj]
        };
      }

      case actionTypes.setListTrCartBasket: {
        return { ...state, listTrCartBasket: action.payload.obj };
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
  setObjCartBasket: obj => ({
    type: actionTypes.setObjCartBasketins,
    payload: { obj }
  }),

  clearObjCartBasket: () => ({ type: actionTypes.clearObjCartBasket }),

  setDisabledInput: bool => ({
    type: actionTypes.setDisabledInput,
    payload: { bool }
  }),
  pushListTrCartBasket: obj => ({
    type: actionTypes.pushListTrCartBasket,
    payload: { obj }
  }),
  setListTrCartBasket: obj => ({
    type: actionTypes.setListTrCartBasket,
    payload: { obj }
  }),

  setEditable: bool => ({
    type: actionTypes.setEditable,
    payload: { bool }
  })
};
