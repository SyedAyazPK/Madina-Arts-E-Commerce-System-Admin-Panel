import { Accounts } from "./Accounts";
import { Inventory } from "./Inventory";
import { Settings } from "./Settings";
import { ShippingZone } from "./ShippingZone";
import UpdatedShippingZone from "./UpdatedShippingZone";

const SettingsConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/inventory",
      element: <Inventory />,
    },
    {
      path: "/accounts",
      element: <Accounts />,
    },
    {
      path: "/shipping-zone",
      element: <UpdatedShippingZone />,
    },
    {
      path: "/add-shipping-zone",
      element: <ShippingZone />,
    },
  ],
};

export default SettingsConfig;
