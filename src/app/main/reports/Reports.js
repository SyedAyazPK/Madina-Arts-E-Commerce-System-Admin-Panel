import { getCustomers } from "app/store/customerSlice";
import {
  getOrdersMonthly,
  getOrdersYearly,
  getSalesMonthly,
  getTopCategories,
  selectOrdersYearly,
} from "app/store/reportSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderWidget from "./OrderWidget";
import ShippingWidget from "./ShippingWidget";
import SummaryWidget from "./SummaryWidget";
import TopCategoriesWidget from "./TopCategoriesWidget";
import TopWidget from "./TopWidget";
import UsersWidget from "./UsersWidget";
import OrderTabs from "./OrderTabs";
import { Typography } from "@mui/material";

export const Reports = () => {
  const dispatch = useDispatch();
  const ordersYearly = useSelector(selectOrdersYearly);

  useEffect(() => {
    dispatch(getOrdersYearly());
    // dispatch(getOrdersMonthly());
    // dispatch(getSalesMonthly());
    // dispatch(getTopCategories());
    // dispatch(getCustomers());
  }, []);
  return (
    <div className="my-24 p-32">
      <div className="sm:col-span-2 md:col-span-4">
        <TopWidget />
      </div>

      <div className="flex-auto grid md:grid-cols-3 gap-16 mt-24">
        {ordersYearly?.[0]?.countsByStatus.map((sale) => (
          <div className="col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-indigo-800">
            <Typography className="text-5xl sm:text-5xl font-semibold leading-none tracking-tight text-green-800">
              {sale.status}
            </Typography>
            <Typography className="mt-4 `text`-lg sm:text-lg font-medium ">
              Total Sales : {sale.earning}
            </Typography>
            <Typography className="mt-4 text-lg sm:text-lg font-medium">
              Total Orders : {sale.count}
            </Typography>
          </div>
        ))}
      </div>

      {/* <div className="mt-24">
        <OrderTabs />
      </div> */}

      {/* <div className="my-16">
        <OrderWidget />
      </div> */}

      {/* <div className="my-16 md:flex justify-between w-full">
        <div className="w-full mr-8 h-full">
          <ShippingWidget />
        </div>
        <div className="w-full h-full">
          <TopCategoriesWidget />
        </div>
      </div> */}

      <SummaryWidget />
    </div>
  );
};
