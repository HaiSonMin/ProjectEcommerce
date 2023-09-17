import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    // private slices
    // public slices
  },
});

export default store;
