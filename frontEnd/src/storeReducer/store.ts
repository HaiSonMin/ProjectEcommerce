import { configureStore } from '@reduxjs/toolkit';
import {
  userSlice,
  otpSlice,
  chatSlice,
  productsCategorySlice,
} from './public';
import productDetailSlice from './public/productDetailSlice';
const store = configureStore({
  reducer: {
    // public slices
    otp: otpSlice,
    user: userSlice,
    chat: chatSlice,
    productsCategory: productsCategorySlice,
    productDetail: productDetailSlice,
    // private slices
  },
});

export default store;
