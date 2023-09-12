import { createSlice } from "@reduxjs/toolkit";
import { SingleValue } from "react-select";

type InitialStateType = {
  productRam: SingleValue<string>;
  productRom: SingleValue<string>;
  productBrand: SingleValue<string>;
  productCategory: SingleValue<string>;
  productContentDescription: SingleValue<string>;
};

const initialState: InitialStateType = {
  productRam: "",
  productRom: "",
  productBrand: "",
  productCategory: "",
  productContentDescription: "",
};

const productReducer = createSlice({
  name: "privateProduct",
  initialState: initialState,
  reducers: {
    setSelectRam: (state, action) => {
      state.productRam = action.payload;
    },
    setSelectRom: (state, action) => {
      state.productRom = action.payload;
    },
    setSelectBrand: (state, action) => {
      state.productBrand = action.payload;
    },
    setSelectCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    setContentDescription: (state, action) => {
      state.productContentDescription = action.payload;
    },
  },
});

export default productReducer.reducer;

export const {
  setSelectRam,
  setSelectRom,
  setSelectBrand,
  setSelectCategory,
  setContentDescription,
} = productReducer.actions;
