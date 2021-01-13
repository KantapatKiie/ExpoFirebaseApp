// import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import * as login from "../actions/action-actives/ActionLogin";
import * as auth from "./ducks/auth.duck";
import * as activesComponent from "../actions/action-actives/ActionActives";
import * as actionSearchHD from "../actions/action-search-hd/ActionSearchHD";
import * as actionCart from "../actions/action-cart/ActionCart";
import * as actionProduct from "../actions/action-product/ActionProduct";
import * as actionHomeHD from "../actions/action-home/ActionHome";
import * as actionPayment from "../actions/action-payment/ActionPayment";
import * as actionPaymentNotifications from "../actions/action-payment/ActionPaymentNotifications";
import * as actionContact from "../actions/action-contact/ActionContact";
import * as actionForgetPassword from "../actions/action-forgetPassword/ActionForgetPassword";
import * as actionChangepassword from "../actions/action-change-password/ActionChangepassword";
import * as actionFlashsaleProduct from "../actions/action-flashsale-product/ActionFlashsaleProduct";
import * as actionHistoryView from "../actions/action-history-view/ActionHistoryView";
import * as actionFavoriteView from "../actions/action-favorite-view/ActionFavoriteView";
import * as actionPromotions from "../actions/action-promotions/ActionPromotions";
import * as actionProductAll from "../actions/action-product-all/ActionProductAll";
import * as actionProductToys from "../actions/action-product-toys/ActionProductToys";

import * as i18n from "./ducks/i18n";

export const rootReducer = combineReducers({
  login: login.reducer,
  auth: auth.reducer,
  i18n: i18n.reducer,
  activesComponent: activesComponent.reducer,
  actionSearchHD: actionSearchHD.reducer,
  actionCart: actionCart.reducer,
  actionProduct: actionProduct.reducer,
  actionHomeHD: actionHomeHD.reducer,
  actionPayment: actionPayment.reducer,
  actionPaymentNotifications: actionPaymentNotifications.reducer,
  actionContact: actionContact.reducer,
  actionForgetPassword: actionForgetPassword.reducer,
  actionChangepassword: actionChangepassword.reducer,
  actionFlashsaleProduct: actionFlashsaleProduct.reducer,
  actionHistoryView: actionHistoryView.reducer,
  actionFavoriteView: actionFavoriteView.reducer,
  actionPromotions: actionPromotions.reducer,
  actionProductAll: actionProductAll.reducer,
  actionProductToys: actionProductToys.reducer,
});

export function* rootSaga() {
  // yield all([auth.saga()]);
}
