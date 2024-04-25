import Brands from './Brands';

const BrandsConfig = {
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
      path: '/brands',
      element: <Brands />,
    },
  ],
};

export default BrandsConfig;
