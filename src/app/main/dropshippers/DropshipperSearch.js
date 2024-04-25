import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchCustomers } from "app/store/customerSlice";
import { searchDropshippers } from "app/store/dropshipperSlice";

export default function DropshipperSearch() {
  const dispatch = useDispatch();
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        height: 30,
       }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Dropshippers"
        inputProps={{ "aria-label": "search Dropshippers" }}
        onChange={(event) => dispatch(searchDropshippers(event.target.value))}
      />
    </Paper>
  );
}
