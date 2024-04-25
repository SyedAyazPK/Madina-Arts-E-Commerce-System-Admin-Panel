import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  Dropshippers: {
    results: [],
  },
  editDropshipperDialog: {
    open: false,
    data: {},
  },
  cashWithdraw: [],
};

export const addDropshipper = createAsyncThunk(
  "Dropshipper/addDropshipper",
  async (Dropshipper, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/auth/register`,
        Dropshipper
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Dropshipper Added",
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
          message: "Error occured while creating Dropshipper",
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

export const getDropshippers = createAsyncThunk(
  "Dropshipper/getDropshippers",
  async (Dropshipper, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/user?role=DropShipper`
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

export const deleteDropshipper = createAsyncThunk(
  "Dropshipper/deleteDropshipper",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/user/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Dropshipper Deleted",
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

export const bulkDeleteDropshippers = createAsyncThunk(
  "Dropshipper/bulkDeleteDropshippers",
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
          message: "Dropshippers Deleted",
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
          message: "Error occured while deleting Dropshipper",
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

export const updateDropshipper = createAsyncThunk(
  "Dropshipper/updateDropshipper",
  async (Dropshipper, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/user/${Dropshipper._id}`,
        Dropshipper
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Dropshipper Updated",
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
          message: "Error occured while updating Dropshipper",
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

export const searchDropshippers = createAsyncThunk(
  "Dropshipper/searchDropshippers",
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

export const getCashWithdraw = createAsyncThunk(
  "Dropshipper/getCashWithdraw",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/cash-withdraw`
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

export const updateWithdraStatus = createAsyncThunk(
  "Dropshipper/updateWithdraStatus",
  async (dataObject, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/cash-withdraw/${dataObject.id}`,
        { status: dataObject.status }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Status Updated",
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
          message: "Error occured while updating status",
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

const DropshipperSlice = createSlice({
  name: "Dropshipper",
  initialState,
  reducers: {
    openEditDropshipperDialog: (state, action) => {
      state.editDropshipperDialog.open = true;
    },
    closeEditDropshipperDialog: (state, action) => {
      state.editDropshipperDialog.open = false;
    },
    setEditDropshipperDialog: (state, action) => {
      state.editDropshipperDialog.data = action.payload;
    },
  },
  extraReducers: {
    [addDropshipper.fulfilled]: (state, action) => {},
    [getDropshippers.fulfilled]: (state, action) => {
      state.Dropshippers = action.payload;
    },
    [searchDropshippers.fulfilled]: (state, action) => {
      state.Dropshippers = { results: action.payload };
    },
    [getCashWithdraw.fulfilled]: (state, action) => {
      state.cashWithdraw = { results: action.payload.result };
    },
  },
});

export const {
  openEditDropshipperDialog,
  closeEditDropshipperDialog,
  setEditDropshipperDialog,
} = DropshipperSlice.actions;

export const selectDropshippers = ({ Dropshipper }) => Dropshipper.Dropshippers;
export const selectEditDropshipperDialogState = ({ Dropshipper }) =>
  Dropshipper.editDropshipperDialog.open;
export const selectEditDropshipperDialogData = ({ Dropshipper }) =>
  Dropshipper.editDropshipperDialog.data;
export const selectCashWithdraw = ({ Dropshipper }) => Dropshipper.cashWithdraw;

export default DropshipperSlice.reducer;
