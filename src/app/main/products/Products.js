import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getProducts, selectProducts } from "app/store/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTable";
import { ProductCard } from "./ProductCard";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="my-24 p-32">
      <Grid container spacing={2} className="mb-16">
        {/* <Grid item xs={8} lg={2}>
          <ProductCard
            title={"Total"}
            total={products?.result?.length}
            color={"lightblue"}
          />
        </Grid> */}
        <Grid item xs={6} lg={2}>
          <ProductCard
            title={"published"}
            total={products?.result[0]?.published?.length}
            color={"#009052"}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <ProductCard
            title={"Drafts"}
            total={products?.result[0]?.draft?.length}
            color={"lightgreen"}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <ProductCard
            title={"Trash"}
            total={products?.result[0]?.deleted?.length}
            color={"pink"}
          />
        </Grid>
      </Grid>

      <div className="flex justify-end w-full items-center">
        <FuseSvgIcon className="text-48" size={16} color="action">
          heroicons-solid:download
        </FuseSvgIcon>
        <Typography className="ml-2">Download</Typography>
      </div>
      <div className="flex justify-end w-full items-center mt-16">
        <ProductSearch />
      </div>
      <Typography className=" title ">Products</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <ProductTable />
    </div>
  );
};
