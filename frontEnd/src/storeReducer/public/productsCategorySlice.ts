import { IProductCard } from '@/interfaces/models/product.interface';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  category_products: Array<IProductCard>;
  category_numberShowProduct: number;
  category_totalProducts: number;
}

const initialState: IInitialState = {
  category_products: [],
  category_numberShowProduct: 0,
  category_totalProducts: 0,
};

const productsCategorySlice = createSlice({
  name: 'productsCategory',
  initialState: initialState,
  reducers: {
    loadProductsCategory(
      state,
      action: {
        payload: { products: Array<IProductCard>; totalProducts: number };
      }
    ) {
      state.category_numberShowProduct = action.payload.products.length;
      state.category_products = action.payload.products;
      state.category_totalProducts = action.payload.totalProducts;
    },
    addProductsCategory(state, action: { payload: Array<IProductCard> }) {
      state.category_numberShowProduct =
        action.payload.length + state.category_products.length;
      state.category_products = [...state.category_products, ...action.payload];
    },
  },
});

export default productsCategorySlice.reducer;

export const { loadProductsCategory, addProductsCategory } =
  productsCategorySlice.actions;

export const getInfoProductsCategory = (state: {
  productsCategory: IInitialState;
}) => state.productsCategory;
