// import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import * as login from "../actions/action-actives/ActionLogin";
import * as auth from "./ducks/auth.duck";
import * as activesComponent from "../actions/action-actives/ActionActives";
import * as actionSearchHD from "../actions/action-search-hd/ActionSearchHD";
import * as actionCart from "../actions/action-cart/ActionCart";
import * as actionProduct from "../actions/action-product/ActionProduct";

export const rootReducer = combineReducers({
  login: login.reducer,
  auth: auth.reducer,
  activesComponent: activesComponent.reducer,
  actionSearchHD: actionSearchHD.reducer,
  actionCart: actionCart.reducer,
  actionProduct: actionProduct.reducer,
});

export function* rootSaga() {
  // yield all([auth.saga()]);
}
