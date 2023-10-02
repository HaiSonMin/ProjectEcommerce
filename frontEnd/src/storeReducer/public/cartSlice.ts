import { LOCAL_STORE_NAME } from "@/constant";
import ILocalStoreCart from "@/helpers/ILocalStoreCart";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

const initializeStateFromLocalStorage = (): IInitialState => {
  const dataStorage = localStorage.getItem(
    LOCAL_STORE_NAME.CART_NAME_LOCAL_STORE
  );
  if (!dataStorage)
    return {
      userId: "",
      products: [],
    };

  const { userId, products } = JSON.parse(dataStorage) as ILocalStoreCart;

  return {
    userId,
    products,
  };
};

const initialState: IInitialState = initializeStateFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: Pick<IInitialState, "products"> }) {
      state.products = action.payload.products;
    },
    removeFromCart(state, action: { payload: string }) {
      const newProducts = state.products.filter(
        (product) => product.productId !== action.payload
      );
      state.products = newProducts;
    },
    removeAllCart(state) {
      state.products = [];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeAllCart, removeFromCart } = cartSlice.actions;

export const getCart = (state: { cart: IInitialState }) => state.cart;
