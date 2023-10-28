import { configureStore } from '@reduxjs/toolkit';
import { userSlice, otpSlice, chatSlice } from './public';
const store = configureStore({
  reducer: {
    // public slices
    otp: otpSlice,
    user: userSlice,
    chat: chatSlice,
    // private slices
  },
});

export default store;
