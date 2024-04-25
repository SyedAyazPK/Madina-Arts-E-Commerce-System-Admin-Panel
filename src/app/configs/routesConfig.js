import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import CategoriesConfig from "../main/categories/CategoriesConfig";
import CustomersConfig from "../main/customers/CustomersConfig";
import ProductsConfig from "../main/products/ProductsConfig";
import OrderConfig from "../main/orders/OrderConfig";
import ShipmentTrackingConfig from "../main/shipment-tracking/ShipmentTrackingConfig";
import SettingsConfig from "../main/settings/SettingsConfig";
import BrandsConfig from "../main/brands/BrandsConfig";
import ReportsConfig from "../main/reports/ReportsConfig";
import DropshippersConfig from "../main/dropshippers/DropshippersConfig";

const routeConfigs = [
  ExampleConfig,
  CategoriesConfig,
  CustomersConfig,
  ProductsConfig,
  OrderConfig,
  ShipmentTrackingConfig,
  SettingsConfig,
  BrandsConfig,
  ReportsConfig,
  DropshippersConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
