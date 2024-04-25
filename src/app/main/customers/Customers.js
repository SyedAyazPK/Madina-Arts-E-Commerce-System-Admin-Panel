import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getCustomers, selectCustomers } from "app/store/customerSlice";
import { ExportToCsv } from "export-to-csv";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomer from "./AddCustomer";
import { CustomerCard } from "./CustomerCard";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";

export const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const rows = customers?.result;

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Customer Data",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div className="my-24 p-32">
      <Grid container spacing={2}>
        <Grid item xs={8} lg={4}>
          <CustomerCard total={rows?.length} />
        </Grid>
        {/* <Grid item xs={6} lg={4}>
          <CustomerCard />
        </Grid>
        <Grid item xs={6} lg={4}>
          <CustomerCard />
        </Grid> */}
      </Grid>
      <div
        className="flex justify-end w-full items-center mt-16 cursor-pointer"
        onClick={() => {
          csvExporter.generateCsv(rows);
        }}
      >
        <FuseSvgIcon className="text-48" size={16} color="action">
          heroicons-solid:download
        </FuseSvgIcon>
        <Typography className="ml-2">Download</Typography>
      </div>
      <div className="flex justify-end w-full items-center mt-16">
        <CustomerSearch />
      </div>
      <div className="w-full flex justify-end my-16">
        <AddCustomer />
      </div>
      <Typography className=" title ">Customers</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <CustomerTable />
    </div>
  );
};
