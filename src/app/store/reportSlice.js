import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import axios from 'axios';
import { showMessage } from './fuse/messageSlice';
const { REACT_APP_API_URL } = process.env;

const initialState = {
  ordersYearly: [],
  ordersMonthly: [],
  salesYearly: [],
  salesMonthly: [],
  monthsArray: [],
  topCategories: [],
};

export const getOrdersYearly = createAsyncThunk(
  'report/getOrdersYearly',
  async (report, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/report/order`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const getOrdersMonthly = createAsyncThunk(
  'report/getOrdersMonthly',
  async (report, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/analytics/orders`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const getSalesYearly = createAsyncThunk(
  'report/getSalesYearly',
  async (report, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/analytics/sales`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const getSalesMonthly = createAsyncThunk(
  'report/getSalesMonthly',
  async (report, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/analytics/sales`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const getTopCategories = createAsyncThunk(
  'report/getTopCategories',
  async (report, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/analytics/categories`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrdersYearly.fulfilled]: (state, action) => {
      state.ordersYearly = action.payload?.result;
    },
    [getOrdersMonthly.fulfilled]: (state, action) => {
      state.ordersMonthly = action.payload?.results;
      let months = action.payload?.results.map((a) => a._id.month);
      let newArray = [];
      let convertMonths = months?.forEach(function (item, i) {
        if (item == 1) newArray[i] = 'Jan';
        if (item == 2) newArray[i] = 'Feb';
        if (item == 3) newArray[i] = 'Mar';
        if (item == 4) newArray[i] = 'Apr';
        if (item == 5) newArray[i] = 'May';
        if (item == 6) newArray[i] = 'Jun';
        if (item == 7) newArray[i] = 'Jul';
        if (item == 8) newArray[i] = 'Aug';
        if (item == 9) newArray[i] = 'Sep';
        if (item == 10) newArray[i] = 'Oct';
        if (item == 11) newArray[i] = 'Nov';
        if (item == 12) newArray[i] = 'Dec';
      });
      state.monthsArray = newArray;
    },
    [getSalesYearly.fulfilled]: (state, action) => {
      state.salesYearly = action.payload?.results;
    },
    [getSalesMonthly.fulfilled]: (state, action) => {
      state.salesMonthly = action.payload?.results;
    },
    [getTopCategories.fulfilled]: (state, action) => {
      state.topCategories = action.payload?.results;
    },
  },
});

export const {} = reportSlice.actions;

export const selectOrdersYearly = ({ report }) => report.ordersYearly;
export const selectOrdersMonthly = ({ report }) => report.ordersMonthly;
export const selectSalesYearly = ({ report }) => report.salesYearly;
export const selectSalesMonthly = ({ report }) => report.salesMonthly;
export const selectMonths = ({ report }) => report.monthsArray;
export const selectTopCategories = ({ report }) => report.topCategories;

export default reportSlice.reducer;
