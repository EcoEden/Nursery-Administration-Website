import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // ✅ Store cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload; // ✅ Sync cart from MongoDB
    },
    addToCartRedux: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // ✅ Increase quantity if item exists
      } else {
        state.items.push(action.payload); // ✅ Add new item
      }
    },
    removeFromCartRedux: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setCartItems, addToCartRedux, removeFromCartRedux } = cartSlice.actions;
export default cartSlice.reducer;
