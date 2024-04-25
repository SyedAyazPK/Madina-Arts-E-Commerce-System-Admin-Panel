import { LinearProgress, Typography } from "@mui/material";
import { getFilteredOrders, getOrders } from "app/store/orderSlice";
import { getProducts, setFilteredProducts } from "app/store/productSlice";
import { useDispatch } from "react-redux";

export const ProductCard = ({ title, total, color }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="customer-card px-16 py-8 cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={() =>
        title === "Total"
          ? dispatch(getProducts())
          : dispatch(setFilteredProducts(title))
      }
    >
      <div className="w-full flex justify-between">
        <Typography className="text-lg font-semibold capitalize">
          {title}
        </Typography>
        <Typography className="text-lg font-semibold">{total} </Typography>
      </div>
      {/* <Typography className='customer-card-title mt-16 mb-8'>
        3% from tomorrow{' '}
      </Typography>
      <LinearProgress color='success' variant='determinate' value={50} /> */}
    </div>
  );
};
