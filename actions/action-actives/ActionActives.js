import { persistReducer } from "redux-persist";
import AsyncStorage from "react-native";
// import storage from "redux-persist-sensitive-storage";
// import AsyncStorage from "@react-native-community/async-storage";

const actionTypes = {
  setActiveComponent: "SET_ACTIVE_COMPONENT",
};

const initialState = {
  tabComponent: null,
};

export const reducer = persistReducer(
  {storage: AsyncStorage, key: "activeComponent" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setActiveComponent:
        return { ...state, tabComponent: action.payload.tabComponent };

      default:
        return state;
    }
  }
);

export const actions = {
  setActionComponent: (tabComponent) => ({
    type: actionTypes.setActiveComponent,
    payload: { tabComponent },
  }),
};
