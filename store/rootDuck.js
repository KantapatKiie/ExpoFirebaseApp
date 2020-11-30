import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import * as login from "../actions/action-actives/ActionLogin";
import * as auth from "./ducks/auth.duck";
import * as activesComponent from "../actions/action-actives/ActionActives";
import * as actionSearchHD from "../actions/action-search-hd/ActionSearchHD";

export const rootReducer = combineReducers({
  login: login.reducer,
  auth: auth.reducer,
  activesComponent: activesComponent.reducer,
  actionSearchHD: actionSearchHD.reducer,
});

export function* rootSaga() {
  // yield all([auth.saga()]);
}
