import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjEventsHDins: "OBJ_EVENTS_CALENDAR_VIEW_HD",
  clearObjEventsHD: "CLEAR_OBJ_EVENTS_CALENDAR_VIEW",
  setDisabledInput: "SET_DISABLED_INPUT_EVENTS_CALENDAR_VIEW",
  pushListTrEventsHD: "PUSH_LIST_TR_EVENTS_CALENDAR_VIEW",
  setListTrEventsHD: "SET_LIST_TR_EVENTS_CALENDAR_VIEW",
  removeListTrEventsHD: "REMOVE_LIST_TR_EVENTS_CALENDAR_VIEW",
  setEditable: "SET_EDITABLE_EVENTS_CALENDAR_VIEW",
};

const initialState = {
  objEventsHD: {
    TYPE_CODE: "",
    TYPE_NAME: "",
    EVENT_NAME: "",
    EVENT_DATE: moment(new Date()).format("DD/MM/YYYY"),
    EVENT_MONTH: new Date(),
    EVENT_FIRST_TIME: moment(new Date()).format("HH:mm"),
    EVENT_LAST_TIME: moment(new Date()).format("HH:mm"),
    PEOPLE: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL: "",
  },
  // listTrEventsHD: [],
  // disabledInput: false,
  // editable: false,
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "EventsHD" },
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

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrEventsHD: {
        return {
          ...state,
          listTrEventsHD: [...state.listTrEventsHD, action.payload.obj],
        };
      }

      case actionTypes.setListTrEventsHD: {
        return { ...state, listTrEventsHD: action.payload.obj };
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
  setObjEventsHD: (obj) => ({
    type: actionTypes.setObjEventsHDins,
    payload: { obj },
  }),

  clearObjEventsHD: () => ({
    type: actionTypes.clearObjEventsHD,
  }),

  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  pushListTrEventsHD: (obj) => ({
    type: actionTypes.pushListTrEventsHD,
    payload: { obj },
  }),
  setListTrEventsHD: (obj) => ({
    type: actionTypes.setListTrEventsHD,
    payload: { obj },
  }),

  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),
};
