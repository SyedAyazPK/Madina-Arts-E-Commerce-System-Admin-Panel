import { Customers } from './Customers';

const CustomersConfig = {
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
      path: '/customers',
      element: <Customers />,
    },
  ],
};

export default CustomersConfig;
