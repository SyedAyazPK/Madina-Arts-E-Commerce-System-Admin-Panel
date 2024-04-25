import { LinearProgress, Typography } from "@mui/material";
import { getFilteredOrders, getOrders } from "app/store/orderSlice";
import { useDispatch } from "react-redux";

export const OrderCard = ({ title, total, color }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="customer-card px-16 py-8 cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={() =>
        title === "Total"
          ? dispatch(getOrders())
          : dispatch(getFilteredOrders(title))
      }
    >
      <div className="w-full flex justify-between">
        <Typography className="text-lg font-semibold">{title}</Typography>
        <Typography className="text-lg font-semibold">{total} </Typography>
      </div>
      {/* <Typography className='customer-card-title mt-16 mb-8'>
        3% from tomorrow{' '}
      </Typography>
      <LinearProgress color='success' variant='determinate' value={50} /> */}
    </div>
  );
};
