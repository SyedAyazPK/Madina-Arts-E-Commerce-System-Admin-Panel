import { combineReducers } from "@reduxjs/toolkit";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import user from "./userSlice";
import shop from "./shopSlice";
import order from "./orderSlice";
import category from "./categorySlice";
import product from "./productSlice";
import customer from "./customerSlice";
import setting from "./settingSlice";
import brand from "./brandSlice";
import shipment from "./shipmentSlice";
import report from "./reportSlice";
import Dropshipper from "./dropshipperSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    user,
    shop,
    order,
    category,
    product,
    customer,
    setting,
    brand,
    shipment,
    report,
    Dropshipper,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "user/userLoggedOut") {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
