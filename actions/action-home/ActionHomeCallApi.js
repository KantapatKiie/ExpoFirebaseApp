import axios from "axios";
import { API_URL } from "../../config/config.app";

export function GetBestsaler(request) {
  return axios.get(API_URL.BEST_SELLING_PRODUCT_LISTVIEW_API, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      page: 1,
    },
  });
}