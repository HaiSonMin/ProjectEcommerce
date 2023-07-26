import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {};

const initialState: InitialStateType = {};

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: initialState,
  reducers: {
    
  },
});

export const {} = productCategorySlice.actions;

export default productCategorySlice.reducer;
