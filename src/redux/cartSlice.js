import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addtocart: (state, action) => {
      state.push(action.payload);
    },
    emptyCart: (state) => [],
    removefromCart: (state, action) => {
      const newState = state.filter((products) => {
        return products._id !== action.payload;
      });
      return newState;
    },
  },
});

export const { addtocart, emptyCart, removefromCart } = cartSlice.actions;

export default cartSlice.reducer;
