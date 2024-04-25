import { ExportOrders } from './ExportOrders';
import { Orders } from './Order';

const OrderConfig = {
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
      path: '/orders',
      element: <Orders />,
    },
    {
      path: '/export-orders',
      element: <ExportOrders />,
    },
  ],
};

export default OrderConfig;
