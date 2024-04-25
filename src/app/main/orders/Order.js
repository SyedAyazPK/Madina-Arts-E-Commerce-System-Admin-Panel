import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getCustomers } from "app/store/customerSlice";
import {
  getAllOrders,
  getOrders,
  selectCount,
  selectOrders,
} from "app/store/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddOrder from './AddOrder';
import { OrderCard } from "./OrderCard";
import OrderFilters from "./OrderFilters";
import OrderSearch from "./OrderSearch";
import OrderTable from "./OrderTable";
import InvoicePage from "./Invoice";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const count = useSelector(selectCount);

  useEffect(() => {
    dispatch(getOrders());
    // dispatch(getAllOrders());
    dispatch(getCustomers());
  }, []);
  const delivered = count?.result?.filter((order) => {
    return order.orderStatus === "Delivered";
  });
  const Proccessing = count?.result?.filter((order) => {
    return order.orderStatus === "Proccessing";
  });
  const Cancelled = count?.result?.filter((order) => {
    return order.orderStatus === "Cancelled";
  });
  return (
    <div className="my-24 p-32">
      <Grid container spacing={2} className="mb-16">
        <Grid item xs={8} lg={2}>
          <OrderCard
            title={"Total"}
            total={count?.result?.length}
            color={"lightblue"}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <OrderCard
            title={"Delivered"}
            total={delivered?.length}
            color={"#009052"}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <OrderCard
            title={"Proccessing"}
            total={Proccessing?.length}
            color={"lightgreen"}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <OrderCard
            title={"Cancelled"}
            total={Cancelled?.length}
            color={"pink"}
          />
        </Grid>
      </Grid>

      <div className="flex justify-end w-full items-center mt-16">
        <OrderSearch />
      </div>
      {/* <div className="flex justify-end w-full items-center mt-16">
        <OrderFilters />
      </div> */}

      <div className="w-full flex justify-end my-16">{/* <AddOrder /> */}</div>

      <OrderTable />
    </div>
  );
};
