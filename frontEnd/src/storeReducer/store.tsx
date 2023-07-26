import { configureStore } from "@reduxjs/toolkit";
import {
  brandReducer,
  productReducer,
  productCategoryReducer,
} from "./private";

const store = configureStore({
  reducer: {
    // private slices
    privateBrand: brandReducer,
    privateProduct: productReducer,
    privateCategoryReducer: productCategoryReducer,
    // public slices
  },
});

export default store;
