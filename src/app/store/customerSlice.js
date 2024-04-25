import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  customers: {
    result: [],
  },
  editCustomerDialog: {
    open: false,
    data: {},
  },
};

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customer, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/auth/register`,
        customer
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Customer Added",
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

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (customer, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/user`);
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

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/user/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Customer Deleted",
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
          message: "Error occured",
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

export const bulkDeleteCustomers = createAsyncThunk(
  "customer/bulkDeleteCustomers",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n._id);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/user/deleteMany`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "customers Deleted",
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
          message: "Error occured while deleting customer",
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

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (customer, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/user/${customer._id}`,
        customer
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "customer Updated",
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
          message: "Error occured while updating customer",
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

export const searchCustomers = createAsyncThunk(
  "customer/searchCustomers",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/user/search`,
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

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    openEditCustomerDialog: (state, action) => {
      state.editCustomerDialog.open = true;
    },
    closeEditCustomerDialog: (state, action) => {
      state.editCustomerDialog.open = false;
    },
    setEditCustomerDialog: (state, action) => {
      state.editCustomerDialog.data = action.payload;
    },
  },
  extraReducers: {
    [addCustomer.fulfilled]: (state, action) => {},
    [getCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload;
    },
    [searchCustomers.fulfilled]: (state, action) => {
      state.customers = { results: action.payload };
    },
  },
});

export const {
  openEditCustomerDialog,
  closeEditCustomerDialog,
  setEditCustomerDialog,
} = customerSlice.actions;

export const selectCustomers = ({ customer }) => customer.customers;
export const selectEditCustomerDialogState = ({ customer }) =>
  customer.editCustomerDialog.open;
export const selectEditCustomerDialogData = ({ customer }) =>
  customer.editCustomerDialog.data;

export default customerSlice.reducer;
