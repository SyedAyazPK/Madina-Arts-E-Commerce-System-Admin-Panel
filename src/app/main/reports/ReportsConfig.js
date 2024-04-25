import { Reports } from './Reports';

const ReportsConfig = {
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
      path: '/',
      element: <Reports />,
    },
  ],
};

export default ReportsConfig;
