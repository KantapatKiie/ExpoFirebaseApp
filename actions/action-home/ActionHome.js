import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
// import {
//   put,
//   all,
//   takeLatest,
//   call,
//   select,
//   takeEvery,
// } from "redux-saga/effects";
// import { GetBestsaler } from "./ActionHomeCallApi";

const actionTypes = {
  setObjHomeHD: "OBJ_HOME_MASTER_VIEW_PAGE_HD",
  clearObjHomeHD: "CLEAR_OBJ_HOME_MASTER_VIEW_PAGE",
  setDisabledInput: "SET_DISABLED_INPUT_HOME_MASTER_VIEW_PAGE",
  setListTrSearchHD: "SET_LIST_TR_HOME_MASTER_VIEW_PAGE",
  pushListTrSearchHD: "PUSH_SET_LIST_TR_HOME_MASTER_VIEW_PAGE",
  setEditable: "SET_EDITABLE_HOME_MASTER_VIEW_PAGE",
  setListCouponHD: "SET_LIST_COUPON_HOME_MASTER_VIEW_PAGE",

  //LoadData
  loadDataHomePageSaga: "LOAD_DATA_HOMEPAGE_HD_SAGA",
};

const initialState = {
  objHomeHD: {
    id: 1,
    start_at: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
    end_at: moment(new Date()).format("YYYY-MM-DDT00:00:00"),
    timeEnds: 0,
  },
  listTrSearchHD: [],
  listCouponHD: [],
};

export const reducer = persistReducer(
  { storage: AsyncStorage, key: "homeHDD" },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.setObjHomeHD: {
        return {
          ...state,
          objHomeHD: action.payload.obj,
        };
      }

      case actionTypes.clearObjHomeHD: {
        return initialState;
      }

      case actionTypes.setDisabledInput: {
        return { ...state, disabledInput: action.payload.bool };
      }

      case actionTypes.pushListTrSearchHD: {
        return {
          ...state,
          listTrSearchHD: [...state.listTrSearchHD, action.payload.obj],
        };
      }

      case actionTypes.setListTrSearchHD: {
        return { ...state, listTrSearchHD: action.payload.obj };
      }

      case actionTypes.setListCouponHD: {
        return { ...state, listCouponHD: action.payload.obj };
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
  setObjHomeHD: (obj) => ({
    type: actionTypes.setObjHomeHD,
    payload: { obj },
  }),
  clearObjHomeHD: () => ({ type: actionTypes.clearObjHomeHD }),
  setDisabledInput: (bool) => ({
    type: actionTypes.setDisabledInput,
    payload: { bool },
  }),
  setEditable: (bool) => ({
    type: actionTypes.setEditable,
    payload: { bool },
  }),

  pushListTrSearchHD: (obj) => ({
    type: actionTypes.pushListTrSearchHD,
    payload: { obj },
  }),
  setListTrSearchHD: (obj) => ({
    type: actionTypes.setListTrSearchHD,
    payload: { obj },
  }),
  setListCouponHD: (obj) => ({
    type: actionTypes.setListCouponHD,
    payload: { obj },
  }),

  loadDataHomePageSaga: item => ({
    type: actionTypes.loadDataHomePageSaga,
    payload: { item }
  }),
};

// export function* saga() {
//   yield takeLatest(
//     actionTypes.loadDataHomePageSaga,
//     function* LoadDataHomePageSaga() {
//       const homeHDD = (state) => state.homeHDD;
//       const { objHomeHD } = yield select(homeHDD);

//       const responseListBestsaler = yield call(GetBestsaler);

//       // // Clone Object
//       // let newObj = { ...objHomeHD };

//       // try {
//       //   newObj.TEST1 = "newVehicle.MAKE_CODE";
//       //   newObj.TEST2 = "newVehicle.MAKE_NAME";

//       //   // set hd and Vehicle, cust
//       //   yield put(actions.setRepairOrderHD(newObj));
//       // } catch (error) {
//       //   console.log(error);
//       // }
//     }
//   );
// }
