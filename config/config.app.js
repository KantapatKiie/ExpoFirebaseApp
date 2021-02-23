// const { REACT_NATIVE_APP_URL_API, REACT_NATIVE_APP_DELAY_SEARCH } = process.env;
// export const DELAY_SEARCH = REACT_NATIVE_APP_DELAY_SEARCH;

// const REACT_NATIVE_APP_API = "http://newpclinic.com/wd/api/v1";
const REACT_NATIVE_APP_API = "http://demo-ecommerce.am2bmarketing.co.th/api/v1";

export const API_URL = {
  //AUTHENTICATE
  REGISTER_API: REACT_NATIVE_APP_API + "/register",
  LOGIN_API: REACT_NATIVE_APP_API + "/login",
  FORGOT_PASSWORD_RESET_API: REACT_NATIVE_APP_API + "/forgot_password_reset",

  //USER_INFO
  USER_INFO_API: REACT_NATIVE_APP_API + "/user",
  EDIT_USER_PROFILE_API: REACT_NATIVE_APP_API + "/user",
  CHANGE_PASSWORD_API: REACT_NATIVE_APP_API + "/user/change_pass",
  IMAGE_PROFILE_UPLOAD_API: REACT_NATIVE_APP_API + "/user/image_profile",
  PROVINCE_API: REACT_NATIVE_APP_API + "/provinces",
  DISTRICT_API: REACT_NATIVE_APP_API + "/districts",
  SUB_DISTRICT_API: REACT_NATIVE_APP_API + "/sub_districts",

  //FLASH_SALE
  FALSH_SALE_VIEW_API: REACT_NATIVE_APP_API + "/flashsales",

  //FAVORITE
  FAVORITE_VIEW_LIST_API: REACT_NATIVE_APP_API + "/user/favorite",

  //HISTORY
  HISTORY_ORDER_LIST_API:
    REACT_NATIVE_APP_API + "/user/history/{search_orderid}",
  HISTORY_ORDER_LIST_SEARCH_API: REACT_NATIVE_APP_API + "/user/history/",
  HISTORY_ORDER_DETAIL_LIST_API: REACT_NATIVE_APP_API + "/user/history_detail/",

  //API_PRODUCT
  BEST_SELLING_PRODUCT_LISTVIEW_API:
    REACT_NATIVE_APP_API + "/products/best_selling",
  POPULARITY_PRODUCT_LISTVIEW_API:
    REACT_NATIVE_APP_API + "/products/popularity",
  CATEGORY_PRODUCT_LISTVIEW_API: REACT_NATIVE_APP_API + "/products/category",
  CATEGORY_PRODUCT_SEARCH_API: REACT_NATIVE_APP_API + "/products/category/",
  BRANDS_PRODUCT_LISTVIEW_API: REACT_NATIVE_APP_API + "/brands/",
  PRODUCT_SEARCH_HD_API: REACT_NATIVE_APP_API + "/products/",
  PRODUCT_FILTHER_SEARCH_HD_API: REACT_NATIVE_APP_API + "/products/filter",

  //PROMOTION
  PROMOTIONS_LISTVIEW_HD_API: REACT_NATIVE_APP_API + "/promotions",
  PROMOTIONS_SEARCH_HD_API: REACT_NATIVE_APP_API + "/promotions/",

  // CART_API
  ADD_CART_ORDER_LISTVIEW_API: REACT_NATIVE_APP_API + "/cart",
  COUNT_CART_ORDER_LISTVIEW_API: REACT_NATIVE_APP_API + "/cart/count",
  SAVE_CART_ORDER_LISTVIEW_API: REACT_NATIVE_APP_API + "/cart/save",

  //SOCAIL_API
  SOCIALS_LIST_HD_API: REACT_NATIVE_APP_API + "/socials",

  //PAYMENT_API
  BANK_LIST_HD_API: REACT_NATIVE_APP_API + "/bank/",
  CHECK_ORDER_PAYMENT_API: REACT_NATIVE_APP_API + "/payments/check/",
  PAYMENTS_TRANSFER_API: REACT_NATIVE_APP_API + "/payments",

  //LOGISTICS
  LOGISTICS_LIST_HD_API: REACT_NATIVE_APP_API + "/logistics",

  //ORDER
  CREATE_ORDER_HD_API: REACT_NATIVE_APP_API + "/orders",
  CANCEL_ORDER_HD_API: REACT_NATIVE_APP_API + "/orders/",

  //NEWS
  NEWS_EVENTS_RELATIONS_HD: REACT_NATIVE_APP_API + "/news/",

  //HISTORY_VIEW
  GET_HISTORY_VIEW_HD_API: REACT_NATIVE_APP_API + "/user/visit",

  //CONTACT_US
  CONTACT_US_HD_API: REACT_NATIVE_APP_API + "/contactus",

  //CONTACT_US
  ACTIVITIES_LIST_HD_API: REACT_NATIVE_APP_API + "/activities",

  //COUPON
  COUPON_LIST_TR_API: REACT_NATIVE_APP_API + "/coupon/list",
  COUPON_VERIFY_IDS_API: REACT_NATIVE_APP_API + "/coupon/verify/",
  MY_COUPON_LIST_TR_API: REACT_NATIVE_APP_API + "/coupon/my_coupon/",
  COLLECT_COUPON_ADD_HD_API: REACT_NATIVE_APP_API + "/coupon/",
};
