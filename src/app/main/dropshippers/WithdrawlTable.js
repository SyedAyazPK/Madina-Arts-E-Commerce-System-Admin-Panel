import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Avatar, Chip, NativeSelect } from "@mui/material";
import {
  deleteOrder,
  getOrders,
  selectEditOrderDialogData,
} from "app/store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import {
  getCashWithdraw,
  selectCashWithdraw,
  updateWithdraStatus,
} from "app/store/dropshipperSlice";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Invoice ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Dropshipper Name",
  },
  {
    id: "account",
    disablePadding: false,
    label: "Account No",
  },
  {
    id: "Amount",
    numeric: false,
    disablePadding: false,
    label: "Amount ",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "Date",
    numeric: false,
    disablePadding: false,
    label: "Date ",
  },
];

export default function WithdrawlTable() {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("image");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const orders = useSelector(selectCashWithdraw);
  const rows = orders?.results;
  const dataObject = useSelector(selectEditOrderDialogData);

  useEffect(() => {
    dispatch(getCashWithdraw());
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function WithdrawlTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              onClick={() =>
                selected.length > 1 && headCell.label === "Actions"
                  ? dispatch(deleteOrder(selected)).then(() =>
                      dispatch(getOrders()).then(() => setSelected([]))
                    )
                  : undefined
              }
              sx={
                selected.length > 1 && headCell.label === "Actions"
                  ? {
                      color: "red",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "2rem",
                    }
                  : { color: "black" }
              }
            >
              {selected.length > 1 && headCell.label === "Actions"
                ? "Remove Selected"
                : headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  WithdrawlTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography className=" title ">Withdrawl Requests</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <WithdrawlTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        // component='th'
                        id={labelId}
                        scope="row"
                        // padding='none'
                      >
                        {row._id}
                      </TableCell>
                      <TableCell className=" ">
                        {" "}
                        {row.DropShipper?.name}
                      </TableCell>
                      <TableCell>{row.DropShipper?.info?.accountNo} </TableCell>
                      <TableCell>
                        <Chip label={row?.amount} color="secondary" />
                      </TableCell>
                      <TableCell>
                        <NativeSelect
                          defaultValue={row?.status}
                          inputProps={{
                            name: "status",
                            id: "uncontrolled-native",
                          }}
                          onChange={(e) =>
                            dispatch(
                              updateWithdraStatus({
                                id: row._id,
                                status: e.target.value,
                              })
                            ).then(() => dispatch(getCashWithdraw()))
                          }
                        >
                          <option value={"completed"}>Completed</option>
                          <option value={"pending"}>Pending</option>
                          <option value={"rejected"}>Rejected</option>
                        </NativeSelect>
                      </TableCell>
                      <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
