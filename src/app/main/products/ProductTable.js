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
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkDeleteProducts,
  deleteProduct,
  getProducts,
  openEditProductDialog,
  selectEditProductDialogData,
  selectFilteredProducts,
  selectProducts,
  setEditProductDialog,
  updateProductStatus,
} from "app/store/productSlice";
import EditProduct from "./EditProduct";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "Description",
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "regular",
    numeric: false,
    disablePadding: false,
    label: "Regular Price ",
  },
  {
    id: "Sale",
    numeric: false,
    disablePadding: false,
    label: "Sale Price ",
  },
  {
    id: "Actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export default function ProductTable() {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("image");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const products = useSelector(selectFilteredProducts);
  const rows = products;
  const dataObject = useSelector(selectEditProductDialogData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  function ProductTableHead(props) {
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
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              onClick={() =>
                selected.length > 1 && headCell.label === "Actions"
                  ? dispatch(bulkDeleteProducts(selected)).then(() =>
                      dispatch(getProducts()).then(() => setSelected([]))
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

  ProductTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <ProductTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {rows?.length > 0 &&
                rows
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
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell>{row.shortDescription}</TableCell>
                        <TableCell>
                          <Avatar src={row.images?.[0]} className="mr-8" />
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.discountedPrice}</TableCell>

                        <TableCell>
                          <div className="flex">
                            <FuseSvgIcon
                              className="text-48 cursor-pointer mr-4"
                              size={24}
                              color="action"
                              onClick={() => {
                                dispatch(setEditProductDialog(row));
                                dispatch(openEditProductDialog());
                              }}
                            >
                              feather:edit-2
                            </FuseSvgIcon>
                            <FuseSvgIcon
                              className="text-48 cursor-pointer"
                              size={24}
                              color="action"
                              onClick={() =>
                                dispatch(
                                  updateProductStatus({
                                    id: row._id,
                                    status: "deleted",
                                  })
                                ).then(() => dispatch(getProducts()))
                              }
                            >
                              material-twotone:delete
                            </FuseSvgIcon>
                            {row.status !== "published" && (
                              <FuseSvgIcon
                                className="text-48 cursor-pointer"
                                size={24}
                                color="action"
                                onClick={() =>
                                  dispatch(
                                    updateProductStatus({
                                      id: row._id,
                                      status: "published",
                                    })
                                  ).then(() => dispatch(getProducts()))
                                }
                              >
                                material-solid:publish
                              </FuseSvgIcon>
                            )}
                          </div>
                        </TableCell>
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
      <EditProduct dataObject={dataObject} key={selected} />
    </Box>
  );
}
