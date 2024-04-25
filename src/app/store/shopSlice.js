import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';

const initialState = {
  quantity: 1,
  cart: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      state.quantity = state.quantity + 1;
    },
    decrementQuantity: (state, action) => {
      if (state.quantity > 0) {
        state.quantity = state.quantity - 1;
      }
    },
    updateCart: (state, action) => {
      const item = action.payload;
      let index = state.cart.findIndex((cartItem) => item.id === cartItem.id);

      if (index === -1) {
        state.cart.push(item);
      } else {
        state.cart[index] = item;
      }
    },
    incrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );

      state.cart[index].quantity = state.cart[index].quantity + 1;
    },
    decrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      if (state.cart[index].quantity > 0) {
        state.cart[index].quantity = state.cart[index].quantity - 1;
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: {},
});

export const {
  incrementQuantity,
  decrementQuantity,
  updateCart,
  incrementCartQuantity,
  decrementCartQuantity,
  removeCartItem,
} = shopSlice.actions;

export const selectQuantity = ({ shop }) => shop.quantity;
export const selectCart = ({ shop }) => shop.cart;

export default shopSlice.reducer;
