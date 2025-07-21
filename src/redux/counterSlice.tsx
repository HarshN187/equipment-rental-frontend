import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: (state) => {
      state.value -= 1;
    },
    addInAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { add, remove, addInAmount } = counterSlice.actions;

export default counterSlice.reducer;
