import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  brands: {
    result: [],
  },
  editDialog: {
    open: false,
    data: {},
  },
};

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (brand, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/brand`,
        brand
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "brand Added",
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
          message: "Error occured while creating brand",
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

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (brand, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/brand`);
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

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/brand/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "brand Deleted",
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

export const bulkDeleteBrands = createAsyncThunk(
  "brand/bulkDeleteBrands",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n._id);
    console.log("ids are", ids);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/brand/deleteMany`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Brands Deleted",
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
          message: "Error occured while deleting brand",
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

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (brand, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/brand/${brand._id}`,
        brand
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "brand Updated",
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
          message: "Error occured while updating brand",
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

const brandSlice = createSlice({
  name: "brand",
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
  extraReducers: {
    [addBrand.fulfilled]: (state, action) => {},
    [getBrands.fulfilled]: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { openEditDialog, closeEditDialog, setEditDialog } =
  brandSlice.actions;

export const selectBrands = ({ brand }) => brand.brands;
export const selectEditBrandDialogState = ({ brand }) => brand.editDialog.open;
export const selectEditBrandDialogData = ({ brand }) => brand.editDialog.data;

export default brandSlice.reducer;
