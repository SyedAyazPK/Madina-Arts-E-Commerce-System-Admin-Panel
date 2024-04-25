import ShipmentTracking from './ShipmentTracking';

const ShipmentTrackingConfig = {
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
      path: '/shipment',
      element: <ShipmentTracking />,
    },
  ],
};

export default ShipmentTrackingConfig;
