import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "Orders-component",
    title: "Orders",
    translate: "Orders",
    type: "collapse",
    url: "/orders",
    icon: "heroicons-solid:currency-dollar",
    children: [
      {
        id: "export-component",
        title: "Export Orders",
        type: "item",
        url: "/export-orders",
        icon: "feather:download-cloud",
      },
    ],
  },
  {
    id: "Customers-component",
    title: "Customers",
    translate: "Customers",
    type: "item",
    url: "/customers",
    icon: "heroicons-solid:users",
  },
  {
    id: "Reports-component",
    title: "Reports",
    translate: "Reports",
    type: "item",
    url: "/",
    icon: "heroicons-solid:document-text",
  },
  {
    id: "Shipment-component",
    title: "Shipment Tracking",
    type: "item",
    url: "/shipment",
    icon: "heroicons-solid:shield-check",
  },
  {
    id: "products",
    title: "Products",
    translate: "Products",
    type: "collapse",
    // url: '/products',
    icon: "heroicons-outline:shopping-cart",
    children: [
      {
        id: "products.all",
        title: "All Products",
        type: "item",
        icon: "heroicons-outline:shopping-cart",
        url: "/products",
      },
      {
        id: "products.add",
        title: "Add Products",
        type: "collapse",
        icon: "heroicons-outline:clipboard-check",
        url: "/add-product",
        children: [
          {
            id: "products.simple",
            title: "Simple Product",
            type: "item",
            icon: "heroicons-solid:tag",
            url: "/add-product",
          },
          {
            id: "products.variation",
            title: "Variation Product",
            type: "item",
            icon: "heroicons-solid:scale",
            url: "/add-variation-product",
          },
          {
            id: "products.add.variation",
            title: "Add Attributes",
            type: "item",
            icon: "heroicons-solid:scale",
            url: "/add-product-variation",
          },
        ],
      },
    ],
  },
  {
    id: "Categories-component",
    title: "Categories",
    translate: "Categories",
    type: "item",
    url: "/categories",
    icon: "heroicons-solid:table",
  },
  {
    id: "Brands-component",
    title: "Brands",
    translate: "Brands",
    type: "item",
    url: "/brands",
    icon: "heroicons-solid:cube",
  },
  {
    id: "Dropshippers-component",
    title: "Dropshippers",
    translate: "Dropshippers",
    type: "collapse",
    url: "/dropshippers",
    icon: "heroicons-solid:user-circle",
    children: [
      {
        id: "List-component",
        title: "List",
        translate: "List",
        type: "item",
        url: "/dropshippers",
        icon: "heroicons-solid:view-list",
      },
      {
        id: "Withdrawl-component",
        title: "Withdrawl",
        translate: "Withdrawl",
        type: "item",
        url: "/withdrawl",
        icon: "feather:pocket",
      },
    ],
  },

  {
    id: "Settings-component",
    title: "Settings",
    translate: "Settings",
    type: "collapse",
    // url: '/',
    icon: "feather:settings",
    children: [
      {
        id: "Shipping-component",
        title: "Shipping Zone",
        type: "collapse",
        icon: "feather:settings",
        children: [
          {
            id: "Get-Shipping-component",
            title: "All Shipping Zone",
            type: "item",
            url: "/shipping-zone",
            icon: "feather:settings",

            // icon: "material-solid:local_shipping",
          },
          {
            id: "Add-Shipping-component",
            title: "Add Shipping Zone",
            type: "item",
            url: "/add-shipping-zone",
            icon: "feather:settings",

            // icon: "material-solid:local_shipping",
          },
        ],
      },
      {
        id: "Accounts-component",
        title: "Accounts",
        translate: "Accounts",
        type: "item",
        url: "/accounts",
        icon: "feather:settings",
      },
      {
        id: "inventory",
        title: "Inventory",
        translate: "Inventory",
        type: "item",
        url: "/inventory",
        icon: "feather:settings",
      },
    ],
  },
];

export default navigationConfig;
