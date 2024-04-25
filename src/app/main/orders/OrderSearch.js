import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchOrders } from "app/store/orderSlice";

export default function OrderSearch() {
  const dispatch = useDispatch();
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        height: 35,
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Orders"
        inputProps={{ "aria-label": "search Orders" }}
        onChange={(event) => dispatch(searchOrders(event.target.value))}
      />
    </Paper>
  );
}
