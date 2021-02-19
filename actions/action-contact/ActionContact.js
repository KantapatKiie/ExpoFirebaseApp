import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjContactHDins: "OBJ_CONTACT_US_ACTIVITY_HD",
  clearObjContactHD: "CLEAR_OBJ_CONTACT_US_ACTIVITY",
};

const initialState = {
  objContactHD: {
    subject: 1,
    full_name: "",
    email: "",
    telephone: "",
    detail: "",
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "contactHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjContactHDins: {
        return {
          ...state,
          objContactHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjContactHD: {
        return initialState;
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjContactHD: (obj) => ({
    type: actionTypes.setObjContactHDins,
    payload: { obj },
  }),

  clearObjContactHD: () => ({
    type: actionTypes.clearObjContactHD,
  }),
};
