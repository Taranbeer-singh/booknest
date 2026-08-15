import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = localStorage.getItem("wishlistItems");

const initialState = {
  wishlistItems: savedWishlist
    ? JSON.parse(savedWishlist)
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        state.wishlistItems.push(action.payload);

        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    toggleWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.wishlistItems.push(action.payload);
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];

      localStorage.removeItem("wishlistItems");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;