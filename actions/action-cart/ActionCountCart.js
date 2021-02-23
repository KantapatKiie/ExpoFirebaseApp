import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actionTypes = {
  setCountCart: "ACTION_COUNT_CARTS_STATE_HD",
};

const initialStates = {
  count_cart: 0,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "countCartHD" },
  (state = initialStates, action) => {
    switch (action.type) {
      case actionTypes.setCountCart:
        return { ...state, count_cart: action.payload.count_cart };

      default:
        return state;
    }
  }
);

export const actions = {
  setCountCart: (count_cart) => ({ type: actionTypes.setCountCart, payload: { count_cart } }),
};
