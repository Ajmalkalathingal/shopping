import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Load cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      console.log(product)

      // ✅ Unique key
      const key = `${product.id}-${product.size || "nosize"}-${product.color || "nocolor"}-${product.imageUrl || "noimage"}`;

      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        existing.quantity += 1;
        toast.success(
          `${product.name} ${
            product.size ? `(${product.size})` : ""
          } ${product.color ? `- ${product.color}` : ""} quantity increased!`
        );
      } else {
        state.items.push({
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,   
          size: product.size || null,
          color: product.color || null,
          quantity: 1,
        });
        toast.success(
          `${product.name} ${
            product.size ? `(${product.size})` : ""
          } ${product.color ? `- ${product.color}` : ""} added to cart!`
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.key !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.key === action.payload);
      if (item) {
        item.quantity += 1;
        toast.success(`${item.name} quantity increased!`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.key === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        toast.success(`${item.name} quantity decreased!`);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.key !== action.payload);
        toast.success(`${item.name} removed from cart!`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
      toast.success("Cart cleared!");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
