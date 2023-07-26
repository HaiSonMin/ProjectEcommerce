import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {};

const initialState: InitialStateType = {};

const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,
  reducers: {},
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
