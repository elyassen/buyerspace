import { createSlice } from "@reduxjs/toolkit";

const FilteredSlice = createSlice({
  name: "filtered",
  initialState: [],
  reducers: {
    addToFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFilter } = FilteredSlice.actions;

export default FilteredSlice.reducer;
