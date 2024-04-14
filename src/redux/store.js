import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import FilteredSlice from "./Filtered";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    filtered: FilteredSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
