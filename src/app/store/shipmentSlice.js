import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { showMessage } from './fuse/messageSlice';
import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

const initialState = {
  shipments: {
    results: [],
  },
  editDialog: {
    open: false,
    data: {},
  },
};

export const addShipmentCSV = createAsyncThunk(
  'shipment/addShipmentCSV',
  async (shipment, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/shipmentTracking`,
        shipment
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'Shipment CSV Added',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while uploading shipment CSV',
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

export const uploadCSV = createAsyncThunk(
  'shipment/uploadCSV',
  async (csv, { dispatch, getState }) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', csv);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/uploadFile/upload-csv`,
        bodyFormData
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'CSV Uploaded',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while uploading Image',
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

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    openEditDialog: (state, action) => {
      state.editDialog.open = true;
    },
    closeEditDialog: (state, action) => {
      state.editDialog.open = false;
    },
    setEditDialog: (state, action) => {
      state.editDialog.data = action.payload;
    },
  },
  extraReducers: {},
});

export const { openEditDialog, closeEditDialog, setEditDialog } =
  shipmentSlice.actions;

export const selectshipments = ({ shipment }) => shipment.shipments;
export const selectEditshipmentDialogState = ({ shipment }) =>
  shipment.editDialog.open;
export const selectEditshipmentDialogData = ({ shipment }) =>
  shipment.editDialog.data;

export default shipmentSlice.reducer;
