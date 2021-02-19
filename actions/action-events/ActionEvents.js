import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjEventsHDins: "OBJ_EVENTS_CALENDAR_VIEW_HD",
  clearObjEventsHD: "CLEAR_OBJ_EVENTS_CALENDAR_VIEW",
  setListTrEventsHD: "SET_LIST_TR_EVENTS_CALENDAR_VIEW",
};

const initialState = {
  objEventsHD: {
    TYPE_CODE: "",
    TYPE_NAME: "",
    EVENT_NAME: "",
    EVENT_DATE: moment(new Date()).format(),
    EVENT_MONTH: new Date(),
    EVENT_FIRST_TIME: moment(new Date()).format(""),
    EVENT_LAST_TIME: moment(new Date()).format(""),
    PEOPLE: "",
    FULL_NAME: "",
    EMAIL: "",
    PHONE: "",
  },
  // listTrEventsHD: [],
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "eventsHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjEventsHDins: {
        return {
          ...state,
          objEventsHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjEventsHD: {
        return initialState;
      }

      case actionTypes.setListTrEventsHD: {
        return { ...state, listTrEventsHD: action.payload.obj };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjEventsHD: (obj) => ({
    type: actionTypes.setObjEventsHDins,
    payload: { obj },
  }),

  clearObjEventsHD: () => ({
    type: actionTypes.clearObjEventsHD,
  }),
  setListTrEventsHD: (obj) => ({
    type: actionTypes.setListTrEventsHD,
    payload: { obj },
  }),
};
