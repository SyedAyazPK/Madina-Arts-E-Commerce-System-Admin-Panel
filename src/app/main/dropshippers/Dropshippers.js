import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getCustomers, selectCustomers } from "app/store/customerSlice";
import { ExportToCsv } from "export-to-csv";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDropshipper from "./AddDropshipper";
import { DropshipperCard } from "./DropshipperCard";
import DropshipperSearch from "./DropshipperSearch";
import DropshipperTable from "./DropshipperTable";
import {
  getDropshippers,
  selectDropshippers,
} from "app/store/dropshipperSlice";

export const Dropshippers = () => {
  const dispatch = useDispatch();
  const dropshippers = useSelector(selectDropshippers);
  const rows = dropshippers?.result;

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Dropshipper Data",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    dispatch(getDropshippers());
  }, []);
  return (
    <div className="my-24 p-32">
      <Grid container spacing={2}>
        <Grid item xs={8} lg={4}>
          <DropshipperCard total={rows?.length} />
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
        <DropshipperSearch />
      </div>
      <div className="w-full flex justify-end my-16">
        <AddDropshipper />
      </div>
      <Typography className=" title ">Dropshippers</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <DropshipperTable />
    </div>
  );
};
