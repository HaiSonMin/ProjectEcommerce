import { configureStore } from "@reduxjs/toolkit";
import { userSlice, otpSlice } from "./public";
const store = configureStore({
  reducer: {
    // public slices
    otp: otpSlice,
    user: userSlice,
    // private slices
  },
});

export default store;
