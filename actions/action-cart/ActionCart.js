import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjCartScreenins: "OBJ_CART_BASKET_HD",
  clearObjCartScreen: "CLEAR_OBJ_CART_BASKET",
  setDisabledInput: "SET_DISABLED_INPUT_CART_BASKET",
  pushListTrCartScreen: "PUSH_LIST_TR_CART_BASKET",
  setListTrCartScreen: "SET_LIST_TR_CART_BASKET",
  removeListTrCartScreen: "REMOVE_LIST_TR_CART_BASKET",
  setEditable: "SET_EDITABLE_CART_BASKET"
};

const initialState = {
  objCartScreen: {
    CART_ID: "CRTID001",
    TITLE: "",
    DETAIL: "",
    IMAGE: "../../assets/tiendat.png",
    PRICE: 0,
    COUNT: 0,
    TOTAL_PRICE: 0,
    INSERT_DT: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
  },
  listTrCartScreen: [],
  disabledInput: false,
  editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "CartScreen" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjCartScreenins: {
        return {
          ...state,
          objCartScreen: action.payload.obj,
          editable: false
        };
      }

      case actionTypes.clearObjCartScreen: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrCartScreen: {
        return {
          ...state,
          listTrCartScreen: [...state.listTrCartScreen, action.payload.obj]
        };
      }

      case actionTypes.setListTrCartScreen: {
        return { ...state, listTrCartScreen: action.payload.obj };
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
  setObjCartScreen: obj => ({
    type: actionTypes.setObjCartScreenins,
    payload: { obj }
  }),

  clearObjCartScreen: () => ({ type: actionTypes.clearObjCartScreen }),

  setDisabledInput: bool => ({
    type: actionTypes.setDisabledInput,
    payload: { bool }
  }),
  pushListTrCartScreen: obj => ({
    type: actionTypes.pushListTrCartScreen,
    payload: { obj }
  }),
  setListTrCartScreen: obj => ({
    type: actionTypes.setListTrCartScreen,
    payload: { obj }
  }),

  setEditable: bool => ({
    type: actionTypes.setEditable,
    payload: { bool }
  })
};
