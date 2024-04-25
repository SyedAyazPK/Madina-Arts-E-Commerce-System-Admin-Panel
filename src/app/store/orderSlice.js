import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import axios from "axios";
import { showMessage } from "./fuse/messageSlice";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  orders: {
    results: [],
  },
  deleteDialog: {
    open: false,
    data: {},
  },
  editDialog: {
    open: false,
    data: {},
  },
  viewDialog: {
    open: false,
    data: {},
  },
  invoiceDialog: {
    open: false,
    data: {},
  },
  allOrders: {
    results: [],
  },
  exportData: [],
  count: {
    results: [],
  },
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/order`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const getFilteredOrders = createAsyncThunk(
  "order/getFilteredOrders",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/order?orderStatus=${order}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/order/all`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const exportOrders = createAsyncThunk(
  "order/exportOrders",
  async (order_Params, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/order/convert-to-excel`,
        { params: order_Params }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const searchOrders = createAsyncThunk(
  "order/searchOrders",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/order/search`,
        {
          params: {
            q: searchParams,
          },
        }
      );
      const data = await response.data;

      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/order/${order.id}`,
        order
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order Updated",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/order/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Order Deleted",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openDeleteDialog: (state, action) => {
      state.deleteDialog.open = true;
      state.deleteDialog.data = action.payload;
    },
    closeDeleteDialog: (state, action) => {
      state.deleteDialog.open = false;
      state.deleteDialog.data = {};
    },
    openEditDialog: (state, action) => {
      state.editDialog.open = true;
    },
    closeEditDialog: (state, action) => {
      state.editDialog.open = false;
    },
    openViewDialog: (state, action) => {
      state.viewDialog.open = true;
    },
    closeViewDialog: (state, action) => {
      state.viewDialog.open = false;
    },
    setEditOrderDialog: (state, action) => {
      state.editDialog.data = action.payload;
    },
    setViewOrderDialog: (state, action) => {
      state.viewDialog.data = action.payload;
    },
    openInvoiceDialog: (state, action) => {
      state.invoiceDialog.open = true;
      state.invoiceDialog.data = action.payload;
    },
    closeInvoiceDialog: (state, action) => {
      state.invoiceDialog.open = false;
      state.invoiceDialog.data = {};
    },
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.count = action.payload;
    },
    [getFilteredOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.allOrders = action.payload;
    },
    [exportOrders.fulfilled]: (state, action) => {
      state.exportData = action.payload;
    },
    [searchOrders.fulfilled]: (state, action) => {
      state.orders = { results: action.payload };
    },
  },
});

export const {
  openDeleteDialog,
  closeDeleteDialog,
  openEditDialog,
  closeEditDialog,
  openViewDialog,
  closeViewDialog,
  setEditOrderDialog,
  setViewOrderDialog,
  openInvoiceDialog,
  closeInvoiceDialog,
} = orderSlice.actions;

export const selectDeleteDialogState = ({ order }) => order.deleteDialog.open;
export const selectDeleteDialogData = ({ order }) => order.deleteDialog.data;
export const selectEditDialogState = ({ order }) => order.editDialog.open;
export const selectViewDialogState = ({ order }) => order.viewDialog.open;
export const selectInvoiceDialogState = ({ order }) => order.invoiceDialog.open;
export const selectInvoiceDialogData = ({ order }) => order.invoiceDialog.data;
export const selectOrders = ({ order }) => order.orders;
export const selectCount = ({ order }) => order.count;
export const selectEditOrderDialogData = ({ order }) => order.editDialog.data;
export const selectViewOrderDialogData = ({ order }) => order.viewDialog.data;
export const selectAllOrders = ({ order }) => order.allOrders;
export const selectExportData = ({ order }) => order.exportData;

export default orderSlice.reducer;
