import Categories from './Categories';

const CategoriesConfig = {
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
      path: '/categories',
      element: <Categories />,
    },
  ],
};

export default CategoriesConfig;
