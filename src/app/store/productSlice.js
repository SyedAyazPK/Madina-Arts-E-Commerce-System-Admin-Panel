import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  products: {
    result: [],
  },
  editProductDialog: {
    open: false,
    data: {},
  },

  attributes: [],
  variations: [],
  combinations: [],
  productVariations: [],
  images: [],
  attributeVariations: [],
  filteredProducts: [],
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/product`,
        product
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Added",
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
          message: "Error occured while creating product",
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

export const addVariationProduct = createAsyncThunk(
  "product/addVariationProduct",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/product`,
        product
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Added",
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
          message: "Error occured while creating product",
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

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/product/filtered-product`
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v2/product/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Deleted",
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

export const bulkDeleteProducts = createAsyncThunk(
  "product/bulkDeleteProducts",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n._id);
    console.log("ids are", ids);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/product/deleteMany`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Products Deleted",
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
          message: "Error occured while deleting product",
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/product/${product._id}`,
        product
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "product Updated",
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
          message: "Error occured while updating product",
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

export const updateProductStatus = createAsyncThunk(
  "product/updateProductStatus",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/product/${product.id}`,
        { status: product.status }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product status updated",
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
          message: "Error occured while updating product",
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

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/product/search`,
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

export const addAttribute = createAsyncThunk(
  "product/addAttribute",
  async (attribute, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/attribute`,
        attribute
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Attribute Added",
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
          message: "Error occured while creating product",
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

export const getAttributes = createAsyncThunk(
  "product/getAttributes",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/attribute`);
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

export const updateAttribute = createAsyncThunk(
  "product/updateAttribute",
  async (attribute, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v2/attribute/${attribute.id}`,
        { enabled: attribute.enabled }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Attribute Updated",
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
          message: "Error occured while updating product",
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

export const getCombinations = createAsyncThunk(
  "product/getCombinations",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/variation/combination`
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

export const getVariations = createAsyncThunk(
  "product/getVariations",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/variation`);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    openEditProductDialog: (state, action) => {
      state.editProductDialog.open = true;
    },
    closeEditProductDialog: (state, action) => {
      state.editProductDialog.open = false;
    },
    setEditProductDialog: (state, action) => {
      state.editProductDialog.data = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes.push(action.payload);
    },
    setProductVariations: (state, action) => {
      state.productVariations.push(action.payload);
    },
    pushImage: (state, action) => {
      state.images.push(action.payload);
    },
    setImagesAction: (state, action) => {
      state.images = action.payload;
    },
    setFilteredProducts: (state, action) => {
      if (action.payload === "published") {
        state.filteredProducts = state.products.result?.[0]?.published;
      } else if (action.payload === "Drafts") {
        state.filteredProducts = state.products.result?.[0]?.draft;
      } else {
        state.filteredProducts = state.products.result?.[0]?.deleted;
      }
    },
  },
  extraReducers: {
    [addProduct.fulfilled]: (state, action) => {},
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = state.products.result?.[0]?.published;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.products = { results: action.payload };
    },
    [getAttributes.fulfilled]: (state, action) => {
      state.attributes = action.payload.result;
    },
    [getCombinations.fulfilled]: (state, action) => {
      state.combinations = action.payload.result.combinations;
    },
    [getVariations.fulfilled]: (state, action) => {
      state.attributeVariations = action.payload.result;
    },
  },
});

export const {
  openEditProductDialog,
  closeEditProductDialog,
  setEditProductDialog,
  setAttributes,
  setProductVariations,
  pushImage,
  setImagesAction,
  setFilteredProducts,
} = productSlice.actions;

export const selectProducts = ({ product }) => product.products;
export const selectFilteredProducts = ({ product }) => product.filteredProducts;
export const selectProductVariation = ({ product }) => product.variations;
export const selectEditProductDialogState = ({ product }) =>
  product.editProductDialog.open;
export const selectEditProductDialogData = ({ product }) =>
  product.editProductDialog.data;
export const selectAttributes = ({ product }) => product.attributes;
export const selectCombinations = ({ product }) => product.combinations;
export const selectProductVariations = ({ product }) =>
  product.productVariations;
export const selectImages = ({ product: { images } }) => images;
export const selectAttributeVariations = ({ product }) =>
  product.attributeVariations;

export default productSlice.reducer;
