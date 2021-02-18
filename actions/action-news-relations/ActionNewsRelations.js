import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const actionTypes = {
  setObjNewsRelationsHDins: "OBJ_NEWS_RELATIONS_CALENDAR_VIEW_HD",
  clearObjNewsRelationsHD: "CLEAR_OBJ_NEWS_RELATIONS_CALENDAR_VIEW",
  setListTrNewsRelationsHD: "SET_LIST_TR_NEWS_RELATIONS_CALENDAR_VIEW",
  removeListTrNewsRelationsHD: "REMOVE_LIST_TR_NEWS_RELATIONS_CALENDAR_VIEW",
};

const initialState = {
  objNewsRelationsHD: {
    id: 1,
    type: "news",
    title_th: "ข่าว 1",
    title_en: "News 1",
    short_description_th: "กกกกก กกดกดกดกด กดกดกดด",
    short_description_en: "dfdfd dfdfd dfdfdfd fdfdfdf",
    operate_datetime: "2021-02-16 07:11:58",
    image: "/storage/85/download.jfif",
    colorTitle: "",
  },
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "newsRelationsHD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjNewsRelationsHDins: {
        return {
          ...state,
          objNewsRelationsHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjNewsRelationsHD: {
        return initialState;
      }

      case actionTypes.setListTrNewsRelationsHD: {
        return { ...state, listTrNewsRelationsHD: action.payload.obj };
      }

      default:
        return initialState;
    }
  }
);

export const actions = {
  setObjNewsRelationsHD: (obj) => ({
    type: actionTypes.setObjNewsRelationsHDins,
    payload: { obj },
  }),

  clearObjNewsRelationsHD: () => ({
    type: actionTypes.clearObjNewsRelationsHD,
  }),

  setListTrNewsRelationsHD: (obj) => ({
    type: actionTypes.setListTrNewsRelationsHD,
    payload: { obj },
  }),
};
