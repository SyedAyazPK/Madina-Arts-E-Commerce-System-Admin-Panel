import { Dropshippers } from "./Dropshippers";
import WithdrawlTable from "./WithdrawlTable";

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
      path: "/dropshippers",
      element: <Dropshippers />,
    },
    {
      path: "/withdrawl",
      element: <WithdrawlTable />,
    },
  ],
};

export default CustomersConfig;
