import { configureStore } from "@reduxjs/toolkit";
import { productReducer as privateProductReducer } from "./private";

const store = configureStore({
  reducer: {
    // private slices
    privateProduct: privateProductReducer,
    // public slices
  },
});

export default store;
