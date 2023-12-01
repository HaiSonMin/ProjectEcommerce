import { IProduct } from '@/interfaces/models';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  product?: IProduct;
  optionChose: number; // index off array option
  optionColorChose: number;
  optionColorChoseImage: number;
}

const initialState: IInitialState = {
  product: undefined,
  optionChose: 0,
  optionColorChose: 0,
  optionColorChoseImage: 0,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialState,
  reducers: {
    loadProductDetail(
      state,
      action: {
        payload: { product: IProduct | undefined };
      }
    ) {
      state.product = action.payload.product;
    },
    setChoseOptionProduct(state, action: { payload: number }) {
      state.optionChose = action.payload;
    },
    setChoseColorProduct(state, action: { payload: number }) {
      state.optionColorChose = action.payload;
    },
    setChoseColorImageProduct(state, action: { payload: number }) {
      state.optionColorChoseImage = action.payload;
    },
  },
});

export default productDetailSlice.reducer;

export const {
  loadProductDetail,
  setChoseOptionProduct,
  setChoseColorProduct,
  setChoseColorImageProduct,
} = productDetailSlice.actions;

export const getStateProductDetail = (state: {
  productDetail: IInitialState;
}) => state.productDetail;
