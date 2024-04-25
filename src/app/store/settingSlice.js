import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  settings: {
    results: [],
  },
  shippingZone: [],
  editsettingDialog: {
    open: false,
    data: {},
  },
  accountPrivacy: {},
  costCalculation: [],
};

export const addAccountSettings = createAsyncThunk(
  "setting/addAccountSettings",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/accountPrivacy`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Setting Updated",
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
          message: "Error occured while creating setting",
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

export const getAccountSettings = createAsyncThunk(
  "setting/getAccountSettings",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/accountPrivacy`
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

export const addShippingZoneSettings = createAsyncThunk(
  "setting/addShippingZoneSettings",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/shippingZone`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Shipping Zone Setting Updated",
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
          message: "Error occured while updating Shipping Zone setting",
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

export const getsettings = createAsyncThunk(
  "setting/getsettings",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/users`);
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

export const getShippingZone = createAsyncThunk(
  "setting/getShippingZone",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/shippingZone`
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
export const editShippingZone = createAsyncThunk(
  "setting/editShippingZone",
  async (params, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/shippingZone/${params._id}`,
        params
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

export const deleteShippingZone = createAsyncThunk(
  "setting/deleteShippingZone",
  async (shippingZone, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/shippingzone/${shippingZone}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Shipping Zone Delete",
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
          message: "Error occured while deleting Shipping Zone setting",
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

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    openEditsettingDialog: (state, action) => {
      state.editsettingDialog.open = true;
    },
    closeEditsettingDialog: (state, action) => {
      state.editsettingDialog.open = false;
    },
    setEditsettingDialog: (state, action) => {
      state.editsettingDialog.data = action.payload;
    },
    setCostCalculation: (state, action) => {
      state.costCalculation = action.payload;
    },
    pushCostCalculation: (state, action) => {
      state.costCalculation.push(action.payload);
    },
  },
  extraReducers: {
    [addAccountSettings.fulfilled]: (state, action) => {},
    [getsettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
    },
    [getShippingZone.fulfilled]: (state, action) => {
      state.shippingZone = action.payload.result;
    },
    [getAccountSettings.fulfilled]: (state, action) => {
      state.accountPrivacy = action.payload?.result?.[0];
    },
  },
});

export const {
  openEditsettingDialog,
  closeEditsettingDialog,
  setEditsettingDialog,
  setCostCalculation,
  pushCostCalculation,
} = settingSlice.actions;

export const selectsettings = ({ setting }) => setting.settings;
export const selectEditsettingDialogState = ({ setting }) =>
  setting.editsettingDialog.open;
export const selectEditsettingDialogData = ({ setting }) =>
  setting.editsettingDialog.data;
export const selectAccountSettings = ({ setting }) => setting.accountPrivacy;
export const selectShippingZone = ({ setting }) => setting.shippingZone;
export const selectCostCalculation = ({ setting }) => setting.costCalculation;

export default settingSlice.reducer;
